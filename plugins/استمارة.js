let handler = async (m, { conn }) => {
    let message = `ـ╕═══════════════════════╒
*`⇜أهلا بك بأستقبال  نقابة┋«✧🍷𝑴𝑨𝑭𝑰𝑨✧`*
ـ╛══════╦╦━╦╦════════════╘ ـ╕══════╩╩━╩╩══╒
 *`استمارة دخول النقابة`📜*
ـ╛═════════════╘

*ـ〄━━━━━━━⌬〔🏮〕⌬━━━━━━━〄*

*┋̥˚❀┋ `اللــــقـب` 🧧:  _⊑يورويتشي ⊒_*


*┋̥˚❀┋ `من طرف` : _⊑يورويتشي ⊒_*


*┋❀̥˚┋ `ذكـر/انثـى`♀️ :  _⊑انثى ⊒_*


*┋̥˚❀┋ `الإنـــمـي/المانغا/المانها`🎌: _⊑ بليتش ⊒_*


*┋̥˚❀┋ `ارفاق صورة للقب`🎴: _⊑ ⊒_*

*ـ〄━━━━━━━⌬〔🏮〕⌬━━━━━━━〄*
 تــــوقــيــع ↯:
*⌞ `......` ⌝*`;

    // URLs for the image and audio file
    let imageUrl = 'https://telegra.ph/file/1ee2af6fdf7c01918916b.jpg';
    let audioUrl = 'https://cdn.sazumi.moe/file/6gbwdh.mp3';

    try {
        // Check if image URL is accessible
        let imageResponse = await fetch(imageUrl, { method: 'HEAD' });
        if (imageResponse.ok) {
            // Send the image with the message
            await conn.sendFile(m.chat, imageUrl, 'image.jpg', message, m);
        } else {
            throw new Error('Image URL is not accessible');
        }

        // Check if audio URL is accessible
        let audioResponse = await fetch(audioUrl, { method: 'HEAD' });
        if (audioResponse.ok) {
            // Send the audio message
            await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
        } else {
            throw new Error('Audio URL is not accessible');
        }
    } catch (e) {
        console.error('Failed to send message:', e);
    }
};

handler.customPrefix = /^(استمارة)$/i;
handler.command = new RegExp;

export default handler;
