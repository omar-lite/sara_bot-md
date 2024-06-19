import fetch from 'node-fetch';

let toM = a => '@' + a.split('@')[0];

async function handler(m, { groupMetadata }) {
   

    
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps[Math.floor(Math.random() * ps.length)];
    let b;
    do {
        b = ps[Math.floor(Math.random() * ps.length)];
    } while (b === a);

   
    const fgytSrdf = 'https://telegra.ph/file/38bc981d35dabf1d82df7.png';

    m.reply(` *تـم الـإعـلان عـن جـريـمـة 🧬💀*
*「🔪 ╎الـقـاتـل : ${toM(a)}*
*「⚰️ ╎الـمـقـتـول : ${toM(b)}*
*قاتل مطلوب حي او ميت⛓️*
> YORHA-BOT`, null, {
        mentions: [a, b],
        url: fgytSrdf // تغيير imageUrl إلى fgytSrdf
    });
}

handler.help = ['formarpareja'];
handler.tags = ['main', 'fun'];
handler.command = ['جريمة', 'قتل'];
handler.group = true;

export default handler;
