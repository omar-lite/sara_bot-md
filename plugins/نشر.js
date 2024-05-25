import { randomBytes } from 'crypto';

let handler = async (m, { conn, text }) => {
  try {
    console.log('جلب مجموعات الدردشة...');
    let chats = Object.entries(conn.chats);
    console.log(`عدد العناصر في conn.chats: ${chats.length}`);

    // طباعة معلومات المجموعات لمعرفة محتوى conn.chats
    chats.forEach(([id, chat]) => {
      console.log(`ID: ${id}, isGroup: ${chat.isGroup}, isChats: ${chat.isChats}`);
    });

    let groupChats = chats.filter(([_, chat]) => chat.isGroup).map(v => v[0]);
    console.log(`عدد المجموعات: ${groupChats.length}`);

    let cc = text ? m : m.quoted ? await m.getQuotedObj() : m;
    let teks = text ? text : cc.text;

    console.log('النص للإرسال:', teks);

    await conn.reply(m.chat, `جاري التجهيز *عدد الجروبات:* ${groupChats.length}`, m);

    for (let id of groupChats) {
      try {
        console.log(`إرسال إلى المجموعة ${id}...`);
        await conn.copyNForward(id, conn.cMod(m.chat, cc, teks), true);
        console.log(`تم الإرسال إلى المجموعة ${id}`);
      } catch (err) {
        console.error(`فشل الإرسال إلى المجموعة ${id}:`, err);
      }
    }

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
