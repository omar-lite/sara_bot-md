const handler = async (m, { conn, text, command, usedPrefix, args }) => {
  if (!text) throw '*مرحبا بك في لعبة ملك أو نجمه*\n*خمن صح واكسب نقاط 🪙*\n• .درهم ملك👑\n• .درهم نجمه⭐\n> YUMEKO';

  let guess = text.trim().toLowerCase();
  let result = Math.random() < 0.5 ? 'ملك' : 'نجمه';

  let user = global.db.data.users[m.sender];

  if (guess === result) {
    user.exp += 500;
    await m.reply(`*•خمنت صح الله عليك🪙*\n\nتخمينك: ${guess}\nالنتيجة: ${result}\nنقاطك💰: +500\n> YUMEKO-BOT`);
  } else {
    user.exp -= 300;
    await m.reply(`*•خمنت غلط حاول تاني🪙*\n\nتخمينك: ${guess}\nالنتيجة: ${result}\nنقاطك💰: -300\n> YUMEKO-BOT`);
  }
};

handler.tags = ['game'];
handler.help = ['darhm'];
handler.command = /^(درهم)$/i;

export default handler;
