const handler = async (message, { conn: connection, isAdmin }) => {
  const developerNumber = '212705117543';
  
  const senderNumber = message.sender.split('@')[0].replace(/[^0-9]/g, '');

  if (message.fromMe) return;
  if (isAdmin) throw '*[❗️] انتي ادمين يايورويتشي ساما👸🏻💙*\n@' + developerNumber;
  
  if (senderNumber !== developerNumber) {
    return message.reply('*[❗️] هذا الأمر مخصص للمطور فقط*');
  }
  
  try {
    await connection.groupParticipantsUpdate(message.chat, [message.sender], 'promote');
  } catch {
    await message.reply('*[❗️] ايف مش قادر*');
  }
};

handler.command = /^ارفعني|admin$/i;
handler.botowner = true;
handler.owner = true;
handler.group = true;

export default handler;
