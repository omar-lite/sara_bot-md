let venomLink = "https://chat.whatsapp.com/J7eE15VGXk2DqTZ836gMvK"; // رابط افتراضي

let handler = async (m, { conn, text, command, participants }) => {
  const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : '';
  const groupAdmins = m.isGroup ? groupMetadata.participants.filter(p => p.admin).map(p => p.id) : '';
  const isAdmin = groupAdmins.includes(m.sender);

  if (command === 'تغير') {
    // تحقق مما إذا كان المستخدم مشرفًا في المجموعة
    if (!isAdmin) {
      m.reply('🛑 هذه الميزة متاحة فقط للمشرفين!');
      return;
    }

    if (!text.startsWith('https://chat.whatsapp.com/')) {
      m.reply('🛑 الرابط غير صالح !!');
      return;
    }
    venomLink = text;
    m.reply(`🗝️ تم تغيير الرابط إلى: ${venomLink}`);
    return;
  }

  let mentioned = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

  if (!mentioned) {
    m.reply('💌 اعمل منشن');
    return;
  }

  conn.sendMessage(mentioned, { text: venomLink }, { quoted: m });
  m.reply(`تعال خاص ياحب عشان تدخل الاساسي🔮💙`);
};

handler.command = ['ارسل', 'تغير'];

export default handler;

