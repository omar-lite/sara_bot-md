let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*[❗تحذير❗] ادخل مشكلتك و بلاغك*\n\n*مثال:*\n*${usedPrefix + command} مرحباً سيدة يورويتشي${usedPrefix}كيف اخبارك*`
  if (text.length < 10) throw `*[❗تحذير❗] البلاغ لا يقل عن عشرة احرف*`
  if (text.length > 1000) throw `*[❗تحذير❗] البلاغ لا يزيد عن الف حرف*`

  let teks = `
*ـ「⪩⚍⚎⚍⚎⚍⚎⪻🌸⪼⚎⚍⚎⚍⚎⚍⪨」*

 *۞  الرقم :* wa.me/${m.sender.split`@`[0]}

*۞ نوع بلاغ :* ${text}

*ـ「⪩⚍⚎⚍⚎⚍⚎⪻🌸⪼⚎⚍⚎⚍⚎⚍⪨」*`

  conn.reply('212705117543@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
  conn.reply('@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
  m.reply(`*[ ✔️ ] تم إبلاغ المطوره المرجو منك الانتظار🧜🏻‍♀️🌸*`)
}

handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|بلاغ|بلغ|ابلاغ|bug|report-owner|reportes)$/i
export default handler
