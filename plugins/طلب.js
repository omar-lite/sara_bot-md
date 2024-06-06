let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*[🗝️] يرجى كتابة نوع الطلب وإرساله*\n\n*مثال:*\n*${usedPrefix + command} اريد ستيكرز يوميكو*`
    if (text.length < 4) throw `*[❗تحذير❗] يرجى توضيح طلب أكثر*`
    if (text.length > 1000) throw `*[❗تحذير❗] طلب لا يزيد عن ألف حرف*`
    
    let teks = `*⪻══━━━━━✥「🔮」✥━━━━━══⪼*\n\n*❍ الرقم :* wa.me/${m.sender.split`@`[0]}\n\n*❍ نوع الطلب :* ${text}\n\n*⪻══━━━━━✥「🔮」✥━━━━━══⪼*`

    // قم بإضافة أرقام إضافية هنا
    let numbers = ['212705117543', '', '', '212607415652'];

    numbers.forEach(async (number) => {
        await conn.reply(`${number}@s.whatsapp.net`, m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
    });

    m.reply(`*[🗝️] تم إرسال طلبك للمشرفين، نرجو منك الانتظار*\n*الرجاء نشر رابط المجموعة🪐* \nhttps://chat.whatsapp.com/DgCRPutiybAK8rZoHPMoSM`)
}

handler.help = ['request <teks>']
handler.tags = ['info']
handler.command = /^(طلب)$/i

export default handler
