import fetch from 'node-fetch';

let toM = a => '@' + a.split('@')[0];

async function handler(m, { groupMetadata, text, usedPrefix, command }) {
    // Split the text to get the title and the mention
    let [title, mention] = text.split('|').map(s => s.trim());

    if (!title || !mention) {
        return m.reply(`الاستخدام الصحيح:\n${usedPrefix + command} <لقب> | <منشن>`);
    }

    // Extract the user ID from the mention
    let userId = mention.match(/@(\d+)/)[1] + '@s.whatsapp.net';

    const fgytSrdf = 'https://telegra.ph/file/38bc981d35dabf1d82df7.png';

    m.reply(`*「❄️┊ إعــلان عن انضمام عضو جديد :📜*

ـ· • • ━━━━━━ ⌞⚜⌝ ━━━━━━ • • ·
*۞ مــعلومــات عن العضو :↯🔏* 

*۞ الـلـقب:🌚* *『 ${title} 』*

*۞ الـمـنـشن:🔥* *『 ${mention} 』*
ـ· • • ━━━━━━ ⌞⚜️⌝ ━━━━━ • • ·

*ـ❊⊏══════{❄️}══════⊐❊*

*「~يـــا أهـــلا وســـهلا يــشــرفـــنـا*
*بـــمـن هـو ممـــيز ، تقبلـــ/ـي*
*تحـــياتـــنا وتقـــديرنـا* 
*ومرحـــبا بڪ ضمـــن عائلـــتنا*
 *المتــواضـــعــہ💜*
*_~ نتـــمنى مشـــارڪـــتڪ*
 *°وتفـــاعـــلڪ وابداعـــڪ🌺._.」*

*ـ❊⊏══════{❄️}══════⊐❊*

*تــحيـات إدارة ⭐️*
 
*نقابة كونوها*`, null, {
        mentions: [userId],
        url: fgytSrdf
    });
}

handler.help = ['ترحيب <لقب> | <منشن>'];
handler.tags = ['main', 'fun'];
handler.command = ['ترحيب'];
handler.group = true;

export default handler;
