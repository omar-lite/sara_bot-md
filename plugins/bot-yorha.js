let handler = m => m;

handler.all = async function (m) {
    let chat = global.db.data.chats[m.chat];
    let audioUrl = null;

    if (/^ياري ياري$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/4ynbh8';
    }

    if (/^عمك$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/r4is9k';
    }

    if (/^غبي|تف عليك$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/hasqri';
    }

    if (/^بانكاي$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/cuojsj';
    }

    if (/^جيت$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/598xgj';
    }

    if (/^غني$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/0v1nnf';
    }

    if (/^ها$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/utazd7.mp3';
    }

    if (/^وات$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/h24obe';
    }

    if (/^بوت خرا$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/uc6f24';
    }

    if (/^حبيبتي$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/3744hq.mp3';
    }

    if (/^ايزن$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/cgq0pi';
    }

    if (/^ايتشيغو$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/xazidi.mp3';
    }

    if (/^بياكيا$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/ow31xh.mp3';
    }

    if (/^اوراهار$/i.test(m.text)) {
        audioUrl = 'https://cdn.sazumi.moe/file/83kpeb';
    }

    if (audioUrl) {
        console.log('Fetching audio URL...');
        // Check if audio URL is accessible
        let audioResponse = await fetch(audioUrl, { method: 'HEAD' });
        if (audioResponse.ok) {
            console.log('Audio URL is accessible');
            // Send the audio message
            await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
            console.log('Audio sent successfully');
        } else {
            throw new Error('Audio URL is not accessible');
        }
    }

    return !0;
}

export default handler;
