const handler = async (message, { conn: connection, isAdmin }) => {
  const developerNumber = '212705117543';
  
  if (message.fromMe) return;
  if (isAdmin) throw '*[❗️] انتي ادمين يايورويتشي ساما👸🏻💙*\n@' + developerNumber;
  
  // تحقق من أن المستخدم هو المطور
  if (message.sender !== developerNumber) {
    return message.reply('*[❗️] هذا الأمر مخصص للمطور فقط*');
  }
  
  try {
    await connection.groupParticipantsUpdate(message.chat, [message.sender], 'promote');
  } catch {
    await message.reply('*[❗️] ايف مش قادر*');
  }
};

handler.command = /^ارفعني|adm$/i;
handler.botonwer = true;
handler.owner = true;
handler.group = true;

export default handler;
