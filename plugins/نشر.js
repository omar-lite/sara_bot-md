import { randomBytes } from 'crypto';

let handler = async (m, { conn, text }) => {
  try {
    // الحصول على جميع مجموعات الدردشة
    console.log('جلب مجموعات الدردشة...');
    let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isGroup).map(v => v[0]);
    console.log(`عدد المجموعات: ${chats.length}`);

    // إذا لم يكن هناك نص، استخدم النص من الرسالة المقتبسة أو الرسالة الحالية
    let cc = text ? m : m.quoted ? await m.getQuotedObj() : m;
    let teks = text ? text : cc.text;

    console.log('النص للإرسال:', teks);

    // إرسال رسالة تجهيزية
    await conn.reply(m.chat, `جاري التجهيز *عدد الجروبات:* ${chats.length}`, m);

    // إرسال الرسالة إلى جميع المجموعات
    for (let id of chats) {
      try {
        console.log(`إرسال إلى المجموعة ${id}...`);
        await conn.copyNForward(id, conn.cMod(m.chat, cc, teks), true);
        console.log(`تم الإرسال إلى المجموعة ${id}`);
      } catch (err) {
        console.error(`فشل الإرسال إلى المجموعة ${id}:`, err);
      }
    }

    // إرسال رسالة تأكيد بعد الانتهاء
    await conn.reply(m.chat, 'تم التحويل', m);
  } catch (e) {
    console.error('حدث خطأ:', e);
    await conn.reply(m.chat, 'حدث خطأ أثناء محاولة نشر الرسالة', m);
  }
};

handler.help = ['tx'];
handler.tags = ['owner'];
handler.command = /^(نشر)$/i;
handler.owner = true;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);
