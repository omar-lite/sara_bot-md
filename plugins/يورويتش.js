let handler = async (m, { conn }) => {
    try {
        let user = global.db.data.users[m.sender];
        let name = conn.getName(m.sender);
        let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
        let message = `ـ· • • ━━━━━━━━ ⌞⚜️⌝ ━━━━━━━━ • • ·
*⌝ هـنـا روابـط خـاصـه لى صــاحـبـة بـوت🗝️💙⌞*
ـ· • • ━━━━━━━━ ⌞⚜️⌝ ━━━━━━━ • • ·

*〄━━━━━━━⌬〔🏮〕⌬━━━━━━━〄*

*⌝♟️╎ مـوقـع مـطـورة بـوت*
*「➣╎ https://linktr.ee/Reven__zenin*

*⌝🗝️╎ راقـم مـطـورة*
*「➣╎ https://wa.me/message/WFSTX2URP75CC1*

*〄━━━━━━━⌬〔🏮〕⌬━━━━━━━〄*
 تــــوقــيــع ↯:
*⌞YORUICHI ⌝╼╾⌞YORHA-BOT⌝*`;

        await conn.sendMessage(m.chat, {
            react: {
                text: "🗝️",
                key: m.key,
            }
        });

        await conn.sendFile(m.chat, 'https://telegra.ph/file/23aa89906edcc3026de96.mp4', 'video.mp4', message, m);

    } catch (e) {
        console.error(e);
    }
};

handler.customPrefix = /^(يورويتشي)$/i;
handler.command = new RegExp;

export default handler;
