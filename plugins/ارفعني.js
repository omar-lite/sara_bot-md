const handler = async (_0x1730a3, {conn: _0x22de6a, isAdmin: _0x51b82d}) => {
  const developerNumber = '+212705117543';
  
  if (_0x1730a3.fromMe) return;
  if (_0x51b82d) throw '*[❗️] انتي ادمين يايورويتشي ساما👸🏻💙*\n@' + developerNumber;
  
  if (_0x1730a3.sender !== developerNumber) {
    return _0x1730a3.reply('*[❗️] هذا الأمر مخصص للمطور فقط*');
  }
  
  try {
    await _0x22de6a.groupParticipantsUpdate(_0x1730a3.chat, [_0x1730a3.sender], 'promote');
  } catch {
    await _0x1730a3.reply('*[❗️] ايف مش قادر*');
  }
};

handler.command = /^ارفعني|adm$/i;
handler.botAdmin = true;
handler.admin = true;
handler.group = true;

export default handler;
