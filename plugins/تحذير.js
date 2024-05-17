const handler = async (m, {conn, text, command, usedPrefix}) => {
  if (m.mentionedJid.includes(conn.user.jid)) return;
  const pp = './src/warn.jpg';
  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ?
      m.mentionedJid[0] :
      m.quoted ?
      m.quoted.sender :
      text;
  } else who = m.chat;
  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const dReason = 'بدون سبب';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `*[❗] قم بالرد علي الرساله او منشن المستخدم *\n\n*—◉ مثال:*\n*${
    usedPrefix + command
  } @${global.suittag}*`;
  if (!who) {
    throw m.reply(warntext, m.chat, {mentions: conn.parseMention(warntext)});
  }
  user.warn += 1;
  await m.reply(
      `${
      user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`
      }تلقي تحذيرا في هذه المجموعه!\n السبب: ${sdms}\n*التحزيرات ${
        user.warn
      }/3*`,
      null,
      {mentions: [who]},
  );
  if (user.warn >= 3) {
    if (!bot.restrict) {
      return m.reply(
          '*[❗تحذير❗] مطور البوت لم يقم بتفعيله كلمه عشان يفهلها*',
      );
    }
    user.warn = 0;
    await m.reply(
        `انا حذرتك عده مرات!!\n*@${
          who.split`@`[0]
        }*انت تجاوزت 3 تحذيرات*, الان سيتم طردك يا حب/اا `,
        null,
        {mentions: [who]},
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'ازاله');
  }
  return !1;
};

handler.command = /^(advertir|advertencia|warn|تحزير)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
  
