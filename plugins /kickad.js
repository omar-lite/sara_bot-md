const handler = async (m, { conn, participants, usedPrefix, command }) => {
  let kickte = `✳️ الاستخدام الصحيح للأمر\n*${usedPrefix + command}*`;

  if (!m.isGroup || !m.sender) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

  let groupMetadata = await conn.groupMetadata(m.chat);
  let owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';

  let botDevelopers = ['212705117543@s.whatsapp.net', '212705117543@s.whatsapp.net'];

  // فلترة المشرفين فقط مع استثناء مالك المجموعة والبوت والمطورين
  let participantsToKick = participants.filter(participant => 
    (participant.admin === 'admin' || participant.admin === 'superadmin') &&
    participant.id !== owner &&
    participant.id !== conn.user.jid &&
    !botDevelopers.includes(participant.id)
  );

  for (let participant of participantsToKick) {
    await conn.groupParticipantsUpdate(m.chat, [participant.id], 'remove');
  }

  m.reply('✅ تم طرد جميع المشرفين ما عدا مالك المجموعة والبوت نفسه والمطورين.');
};

handler.help = ['kickad'];
handler.tags = ['group'];
handler.command = ['kickad', 'اسرق'];
handler.group = true;
handler.owner = true;
handler.botAdmin = true;

export default handler;
