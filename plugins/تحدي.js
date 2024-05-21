const timeout = 60000;
const poin = 500;
const poin_lose = -100;
const poin_bot = 200;
const handler = async (m, {conn, usedPrefix, text}) => {
  conn.suit = conn.suit ? conn.suit : {};
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw '*[❗] أنهِ لعبتك قبل أن تبدأ لعبة أخرى*';
  const textquien = `*قم بمنشن الاعب الذي تريد ان تتحداه*\n\n*—◉ *بهذه الطريقه*\n${usedPrefix}تحدي @${global.suittag}`;
  if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)});
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `*[❗] الشخص الذي تريد تحديه لا يزال يلعب لعبة أخرى، انتظر حتى ينتهي من اللعب`;
  const id = 'suit_' + new Date() * 1;
  const caption = `🎮 *لعبة حجر ورقه مقص* 🎮\n\n—◉ @${m.sender.split`@`[0]} لقد تحداك هذا الشخص في لعبه @${m.mentionedJid[0].split`@`[0]} هل تقبل التحدي\n◉ اكتب "نعم" للموافقه\n◉ اكتب "لا" للرفض\n`;
  const imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`;
  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, {text: caption}, {mentions: await conn.parseMention(caption)}),
    id: id,
    p: m.sender,
    p2: m.mentionedJid[0],
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `[ ⏳ ] لقد تأخر الاعب الاخر اعد المحاوله عندما يكون متاحا`, m);

      delete conn.suit[id];
    }, timeout), poin, poin_lose, poin_bot, timeout,
  };
};
handler.command = /^تحدي|suit(pvp)?$/i;
handler.group = true;
handler.game = true;
export default handler;
