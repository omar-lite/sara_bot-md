// هذا القسم للتعامل مع الأمر "طلب"
let requestHandler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*[🗝️] يرجى كتابة نوع الطلب وإرساله*\n\n*مثال:*\n*${usedPrefix + command} اريد ستيكرز يوميكو*`
    if (text.length < 4) throw `*[❗تحذير❗] يرجى توضيح طلب أكثر*`
    if (text.length > 1000) throw `*[❗تحذير❗] طلب لا يزيد عن ألف حرف*`

    let teks = `*ـ「⪩⚍⚎⚍⚎⚍⚎⪻🔮⪼⚎⚍⚎⚍⚎⚍⪨」*\n\n *۞  الرقم :* wa.me/${m.sender.split`@`[0]}\n\n*۞ نوع طلب :* ${text}\n\n*ـ「⪩⚍⚎⚍⚎⚍⚎⪻🔮⪼⚎⚍⚎⚍⚎⚍⪨」*`

    // قم بإضافة أرقام إضافية هنا
    let numbers = ['212705117543', '212607415652']; // ضع الأرقام هنا

    numbers.forEach(async (number) => {
        await conn.reply(`${number}@s.whatsapp.net`, m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] } })
    });

    m.reply(`*[🗝️] تم إرسال طلبك للمشرفين، نرجو منك الانتظار*\n*الرجاء نشر رابط المجموعة🪐* \nhttps://chat.whatsapp.com/DgCRPutiybAK8rZoHPMoSM`)
}

// هذا القسم للتعامل مع الأمر "تم"
let doneHandler = async (m, { conn, text }) => {
    if (!text) throw `*[🗝️] يرجى كتابة لقب المشرف بعد الأمر*\n\n*مثال:*\n*.تم مشرف*`
    let supervisor = text.trim();

    let teksDone = `*「❄️┆جاري تنفيذ طلب : ........≫*\n*ـ•┈┈┈••✦ ♡ ✦••┈┈┈•ـ*\n*「❄️┆مسؤول عنه :「⊂ ${supervisor} ⊃」*`;

    // إرسال رسالة تأكيد التنفيذ إلى المجموعة التي يوجد فيها
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupLink = `https://chat.whatsapp.com/${groupMetadata.id}`;

    await conn.sendMessage(m.chat, teksDone, 'conversation', { quoted: m });

    m.reply(`*[🗝️] تم إرسال تأكيد التنفيذ إلى المجموعة بنجاح*`);
}

// ربط الأوامر مع الدوال المناسبة
let handler = async (m, context) => {
    let { command } = context;
    if (command === 'طلب') {
        await requestHandler(m, context);
    } else if (command === 'تم') {
        await doneHandler(m, context);
    }
}

handler.help = ['طلب <نوع الطلب>', 'تم <لقب المشرف>']
handler.tags = ['info']
handler.command = /^(طلب|تم)$/i

export default handler
