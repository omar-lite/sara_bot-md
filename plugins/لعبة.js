const handler = async (_0x539a2f, { conn: _0x381180, text: _0xc66c29, command: _0x55f077, usedPrefix: _0x122673, args: _0x107239 }) => {
    const db = global.db.data.users[_0x539a2f.sender];
    const cooldown = db.wait + 0x2710;

    if (new Date() - db.wait < 0x2710) {
        throw '🕓 انتظر حتى ' + Math.floor((cooldown - new Date()) / 1000) + ' وقم بالعب مره اخري*';
    }

    if (!_0x107239[0]) {
        return _0x381180.reply(_0x539a2f.chat,
            '*حجر 🗿, ورقه📄 أو مقص ✂️*\n\n' +
            '*—◉ أختار واحدا لكي تلعب مع البوت مثل:*\n' +
            '*◉ ' + (_0x122673 + _0x55f077) + ' حجر*\n' +
            '*◉ ' + (_0x122673 + _0x55f077) + ' ورقه*\n' +
            '*◉ ' + (_0x122673 + _0x55f077) + ' مقص*\n' +
            '「YUMEKO-BOT」' +
            '「YORHA-BOT」',
            _0x539a2f
        );
    }

    let botChoice = Math.random();
    if (botChoice < 0.34) {
        botChoice = 'حجر';
    } else if (botChoice < 0.67) {
        botChoice = 'مقص';
    } else {
        botChoice = 'ورقه';
    }

    const userChoice = _0xc66c29.toLowerCase();

    if (userChoice === botChoice) {
        db.exp += 500;
        _0x381180.reply(_0x539a2f.chat, `🔰 تعادل!\n\n👈🏻 انت: ${userChoice}\n👈🏻 البوت: ${botChoice}\n🎁 الجائزه +500 XP`);
    } else if ((userChoice === 'ورقه' && botChoice === 'حجر') ||
               (userChoice === 'حجر' && botChoice === 'مقص') ||
               (userChoice === 'مقص' && botChoice === 'ورقه')) {
        db.exp += 1000;
        _0x381180.reply(_0x539a2f.chat, `🥳 عاش كسبتني! 🎉\n\n👈🏻 انت: ${userChoice}\n👈🏻 البوت: ${botChoice}\n🎁 الجائزة +1000 XP`);
    } else {
        db.exp -= 300;
        _0x381180.reply(_0x539a2f.chat, `☠️ كسبتك! ❌\n\n👈🏻 انت: ${userChoice}\n👈🏻 البوت: ${botChoice}\n❌ الخسائر -300 XP`);
    }

    db.wait = new Date().getTime();
};

handler.command = ['ppt'];
handler.tags = ['games'];
handler.help = ['لعبة', 'العب'];

export default handler;
