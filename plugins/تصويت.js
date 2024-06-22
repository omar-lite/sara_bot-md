const handler = async (m, {conn, text, args, usedPrefix, command}) => {
  let name = await conn.getName(m.sender);
  if (name == 'undefined') name = 'Indefinido';
  const b = text.split('|');
  if (!b[1]) throw `*[❗] استخدام صحيح ${usedPrefix + command} من هو سيدك؟|يورويتشي| ماكيما...*`;
  if (b[12]) throw `*[❗] استخدام صحيح${usedPrefix + command} من هو سيدك؟|يورويتشي|ماكيما...*`;
  const caption = `*جدول تصويت:*\n${name}\n*السؤال:*\n${text.split('|')[0]}`.trim();
  const options = text.split("|").slice(1).map(option => ({ optionName: option.trim() }));  
  const sendPollMessage = {
    messageContextInfo: {
        messageSecret: "bT3tfZngfSMWK2zOEL8pSclPG+xldidYDX+ybB8vdEw="
    },
    pollCreationMessage: {
        name: caption,
        options: options,
        selectableOptionsCount: 1,
    }
  };
conn.relayMessage(m.chat, sendPollMessage, {quoted: m});
};
handler.help = ['encuesta question|option|option'];
handler.tags = ['group'];
handler.command = ['تصويت', 'vote'];
export default handler;
