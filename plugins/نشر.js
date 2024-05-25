import { randomBytes } from 'crypto';

let handler = async (m, { conn, text }) => {
  // الحصول على جميع المجموعات
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isGroup).map(v => v[0]);
  
  // إذا لم يكن هناك نص، استخدم النص من الرسالة المقتبسة أو الرسالة الحالية
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m);
  let teks = text ? text : cc.text;

  // إرسال رسالة تجهيزية
  conn.reply(m.chat, `جاري التجهيز *عدد الجروبات:* ${chats.length}`, m);

  // إرسال الرسالة إلى جميع المجموعات
  for (let id of chats) {
    try {
      await conn.copyNForward(id, conn.cMod(m.chat, cc, teks), true);
    } catch (err) {
      console.error(`فشل الإرسال إلى المجموعة ${id}:`, err);
    }
  }

  // إرسال رسالة تأكيد بعد الانتهاء
  m.reply('تم التحويل');
};

handler.help = ['tx'];
handler.tags = ['owner'];
handler.command = /^(نشر)$/i;
handler.owner = true;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);
