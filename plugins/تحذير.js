import fs from 'fs';

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (m.mentionedJid.includes(conn.user.jid)) return;

  const pp = './src/warn.jpg';
  let who;

  if (m.isGroup) {
    who = m.mentionedJid.length > 0 ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  } else {
    who = m.chat;
  }

  if (!who) {
    const warntext = `*[❗] قم بالرد على الرسالة أو منشن المستخدم *\n\n*—◉ مثال:*\n*${usedPrefix + command} @${global.suittag}*`;
    throw m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  const user = global.db.data.users[who] || {};
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'بدون سبب';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');

  user.warn = (user.warn || 0) + 1;
  global.db.data.users[who] = user;

  await m.reply(
    `*@${who.split`@`[0]}* تلقى تحذيراً في هذه المجموعة!\nالسبب: ${sdms}\n*التحذيرات ${user.warn}/3*`,
    null,
    { mentions: [who] }
  );

  if (user.warn >= 3) {
    if (!bot.restrict) {
      return m.reply('*[❗تحذير❗] مطور البوت لم يقم بتفعيل القيود. يرجى التواصل معه لتفعيلها.*');
    }

    user.warn = 0; // إعادة تعيين التحذيرات بعد الطرد
    global.db.data.users[who] = user;
    await m.reply(
      `أنا حذرتك عدة مرات!\n*@${who.split`@`[0]}* تجاوزت 3 تحذيرات، سيتم طردك الآن.`,
      null,
      { mentions: [who] }
    );

    // إضافة تأخير بسيط لضمان إرسال الرسائل قبل الطرد
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    } catch (e) {
      m.reply(`فشل في طرد المستخدم @${who.split`@`[0]}. تأكد من أن البوت لديه صلاحيات كافية.`, null, { mentions: [who] });
    }
  }

  return !1;
};

handler.command = /^(تحذير)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

                               
