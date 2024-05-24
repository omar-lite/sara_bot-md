let venomLink = "https://chat.whatsapp.com/J7eE15VGXk2DqTZ836gMvK"; // رابط افتراضي

let handler = async (m, { conn, text, command }) => {
  if (command === 'تغير') {
    if (!text.startsWith('https://chat.whatsapp.com/')) {
      m.reply('🛑 الرابط غير صالح !!');
      return;
    }
    venomLink = text;
    m.reply(`تم تغيير الرابط إلى: ${venomLink}`);
    return;
  }

  let mentioned = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

  if (!mentioned) {
    m.reply('💌 اعمل منشن');
    return;
  }

  conn.sendMessage(mentioned, { text: venomLink }, { quoted: m });
  m.reply(`✨ تم ارسال الرابط خليه يبص خاص ✨`);
};
handler.owner = true;
handler.command = ['ابعت', 'تغير'];
export default handler;
