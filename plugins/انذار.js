let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {      
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        if (!who) throw `*[❗] يــرجــي وضــع مــنــشــن للــشــخــص او الــرد عــلــى رســالــه لــه @مــنــشــن*\n\n*📌 مــثــال :* ${usedPrefix + command} *@شــخــص*`
        if (!(who in global.db.data.users)) throw `✳️ *لـم يـتـم الـعـثـور عـلـى الـمـسـتخـدم فـي قـاعـدة الـبـيـانـات الـخـاصـة بـي*`
        let name = conn.getName(m.sender)
        let warn = global.db.data.users[who].warn
        if (warn < war) {
            global.db.data.users[who].warn += 1
            m.reply(`
*⚠️ تــم تــحــذيــر الــمــســتــخــدم ⚠️*
*┌─────⊷*
*▢〉  ♆ مـــســـؤول: ${name}*
*▢〉 🕶 مـــســـتـــخـــدم:*
*▢〉   ‣ @${who.split`@`[0]}*
*▢〉 ❗️ يــــحــــذر: ${warn + 1}/4*
*▢〉 ❓ ســـبـــب:* *${text}*
*└──────────────⊷*`, null, { mentions: [who] })

            m.reply(`
*⚠️ حــذر ⚠️*
*لــقــد تــلــقــيــت تــحــذيــرًا مــن أحــد الــمــشــرفــيــن*
*┌─────⊷*
*▢〉 تــحــذيــرات: ${warn + 1}/4* 
*إذا تــلــقــيــت* ~*4*~ *تــحــذيــرات ســيــتــم إزالــتــك تــلــقــائــيــاً مــن الـمـجـمـوعـة ‼︎*`, who)
        } else if (warn == war) {
    global.db.data.users[who].warn = 0;
    const userId = who.split('@')[0];
    m.reply(`⛔ *الــعــضــو* *${userId}* تــجــاوز ~*4*~ *تــحــذيــرات، لــذا تــتــم إعــادة ضــبــط الــتــحــذيــرات.*`);
    await time(1);
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
    m.reply(`♻️ *الــعــضــو* *${userId}* *تــم طــرده مــن الــمــجــمــوعــة* *${groupMetadata.subject}* *لتجاوزه* ~*4*~ *تــحــذيــرات.*`);
}


}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['انذار','warn',] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
