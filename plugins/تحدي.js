let handler = async (m, { conn, text, command, usedPrefix, args }) => {
let pp = 'https://www.bighero6challenge.com/images/thumbs/Piedra,-papel-o-tijera-0003318_1584.jpeg'
if (!args[0]) throw conn.sendHydrated(m.chat, 'حجر, ورقه, مقص\n\n استخدم الزراير او الاوامر عشان تلعب يقلب ميجو ✨:\n.ppt piedra\n.ppt papel\n.ppt tijera\n\n_Abdelrahman Elshamhout_', wm, pp, null, null, null, null, [
['حجر 🥌', `${usedPrefix + command} حجر`],
['ورقة 📄', `${usedPrefix + command} ورقة`],
['مقص ✂️', `${usedPrefix + command} مقص`]
], m)
var astro = Math.random()
if (astro < 0.34) {
astro = 'حجر' 
} else if (astro > 0.34 && astro < 0.67) {
astro = 'مقص' 
} else {
astro = 'ورقة'
}
if (text == astro) {
global.db.data.users[m.sender].exp += 500
m.reply(`🔰 تعادل!\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +500 نقطة`)
} else if (text == 'ورقة') {
if (astro == 'حجر') {
global.db.data.users[m.sender].exp += 1000
m.reply(`🥳 لقد فزت! 🎉\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +1000 نقطة`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`☠️ انت تخسر! ❌\n\nانت: ${text}\nالبوت: ${astro}\n❌ تم خصم -300 نقطة`)
}
} else if (text == 'مقص') {
if (astro == 'ورقة') {
global.db.data.users[m.sender].exp += 1000
m.reply(`🥳 لقد فزت! 🎉\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +1000 `)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`☠️ انت تخسر! ❌\n\nانت: ${text}\nالبوت: ${astro}\n❌ تم خصم -300 نقطة`)
}
} else if (text == 'مقص') {
if (astro == 'ورقة') {
global.db.data.users[m.sender].exp += 1000
m.reply(`🥳 لقد فزت! 🎉\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +1000 نقطة`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`☠️ انت تخسر! ❌\n\nانت: ${text}\nالبوت: ${astro}\n❌ تم خصم -300 نقطة`)
}
} else if (text == 'ورقة') {
if (astro == 'حجر') {
global.db.data.users[m.sender].exp += 1000
m.reply(`🥳 لقد فزت! 🎉\n\nانت: ${text}\nالبوت: ${astro}\n🎁 لقد حصلت علي +1000 نقطة`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`☠️ انت تخسر! ❌\n\nانت: ${text}\nالبوت: ${astro}\n❌ تم خصم -300 نقطة`)
}
} else if (text == 'حجر') {
if (astro == 'مقص') {
global.db.data.users[m.sender].exp += 1000
m.reply(`🥳 لقد فزت! 🎉\n\n*👉🏻 انت: ${text}\n👉🏻 البوت: ${astro}\n🎁 لقد حصلت علي +1000 نقطة`)
} else {
global.db.data.users[m.sender].exp -= 300
m.reply(`☠️ انت تخسر! ❌\n\n*👉🏻 انت: ${text}\n👉🏻 البوت: ${astro}\n❌ تم خصم -300 نقطة`)
}
}}
handler.help = ['ppt']
handler.tags = ['games']
handler.command = /^(تحدي)$/i
export default handler
