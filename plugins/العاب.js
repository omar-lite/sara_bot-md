let handler = async (m, { conn, usedPrefix }) => {
    // قائمة الصور
    let mediaFiles = [
        './views/img/العاب.jpg',
        './views/img/العاب1.jpg',
        './views/img/العاب2.jpg',
        './views/img/العاب3.jpg',
        './views/img/العاب4.jpg',
        './views/img/العاب5.jpg',
        './views/img/العاب6.jpg',
        './views/img/العاب7.jpg',
        './views/img/العاب8.jpg',
        './views/img/العاب9.jpg'
    ];

    // اختيار ملف عشوائي من القائمة
    let randomMedia = pickRandom(mediaFiles);

    // رد الفعل عند تلقي الرسالة
    let done = '🕹️';
    m.react(done);

    // النص المصاحب للرسالة
    let text = `
*┌─⊷「❏ الأوامــر المــتــاحــة 🕹️」⊶*
*• ${usedPrefix}هــيــل — ❤️‍🩹 للــعــلاج*
*• ${usedPrefix}مــغــامــرة — 🎣 لـلــمــوارد*
*• ${usedPrefix}تــعــديــن — ⛏️ لـلــمــوارد*
*• ${usedPrefix}دنــجــن — 🏰 لـلــمــوارد*
*• ${usedPrefix}حــظ — ☘️ لـلــخــبــرة*
*• ${usedPrefix}ســرق — 🥷 لـلــخــبــرة*
*• ${usedPrefix}مــصــارعــة — 🥊 لـلــذهــب*
*• ${usedPrefix}عــجــلــة — 🎡 لـلــذهــب*
*• ${usedPrefix}لــعــبــة — 🎮 لـلــذهــب*
*• ${usedPrefix}اكــس — ❌ لـلــذهــب*
*• ${usedPrefix}ربــح — 🎰 لـلــذهــب*
*• ${usedPrefix}ايـمـوجـي — 🙂 لـلــذهــب*
*• ${usedPrefix}ســؤال — 🤔 لـلــذهــب*
*• ${usedPrefix}رتــب — 🔀 لـلــذهــب*
*• ${usedPrefix}حــزر — ↕️ لـلــذهــب*
*• ${usedPrefix}عــمــل — 👨🏼‍💼 لـلــنــقــود*
*• ${usedPrefix}اســتــثــمــار — 💹 لـلــنــقــود*
*└──────────────⊷*
*┌───⊷*
*• ${usedPrefix}نــقــود — 💲 لـلــنــقــود↶*
*•* *⏎ تـحـويـل الـذهـب🪙الـى💲نـقـود*
*└──────────────⊷*
*┌───⊷*
*• ${usedPrefix}حــقــيــبــة — 💼 اغــراضــك*
*• ${usedPrefix}شــــراء — 🛍️ لـلــشــراء*
*• ${usedPrefix}بــــيــــع — 🎟 لـلــبــيــع*
*• ${usedPrefix}تــحويــل — 💱 لـلــتــحويــل*
*└──────────────⊷*`.trim();

    // التحقق من نوع الملف وإرساله
    if (randomMedia.endsWith('.jpg') || randomMedia.endsWith('.jpeg')) {
        // إذا كان الملف صورة
        await conn.sendFile(m.chat, randomMedia, null, text, m);
    } else if (randomMedia.endsWith('.mp4')) {
        // إذا كان الملف فيديو
        await conn.sendVideo(m.chat, randomMedia, null, text, m);
    } else {
        console.error('نوع الملف غير مدعوم:', randomMedia);
    }
};

handler.help = ['العاب']
//handler.command = ['العاب'];
handler.group = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
