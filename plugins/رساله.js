import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import uploadFile from '../lib/uploadFile.js'

let handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
    let users = participants.map(u => conn.decodeJid(u.id))
    let q = m.quoted ? m.quoted : m || m.text || m.sender
    let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender
    let messageType = m.quoted ? q.mtype : 'extendedTextMessage'
    let messageContent = m.quoted ? c.message[q.mtype] ?? {} : { text: '' || c }
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && م.mentionedJid[0] ? م.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات`;

    let { name } = global.db.data.users[who];

    global.myContact = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            remoteJid: 'status@broadcast'
        },
        message: {
            contactMessage: {
                displayName: `${name}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }
    }

    let finalText = text || q.text

    if (messageType === 'imageMessage' || messageType === 'videoMessage') {
        let media = await q.download()
        let link = await uploadFile(media)

        await conn.sendMessage(
            m.chat,
            {
                [messageType === 'imageMessage' ? 'image' : 'video']: { url: link },
                caption: finalText,
                contextInfo: {
                    mentionedJid: users,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: 'your_newsletter_jid_here@newsletter', // ضع هنا معرف نشرتك الإخبارية
                        newsletterName: 'YORHA-BOT', // ضع هنا اسم نشرتك الإخبارية
                        serverMessageId: -1
                    }
                }
            },
            { quoted: global.myContact }
        )
    } else {
        await conn.sendMessage(
            m.chat,
            { 
                text: finalText,
                contextInfo: {
                    mentionedJid: users,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: 'your_newsletter_jid_here@newsletter', // ضع هنا معرف نشرتك الإخبارية
                        newsletterName: 'YORHA-BOT', // ضع هنا اسم نشرتك الإخبارية
                        serverMessageId: -1
                    }
                }
            },
            { quoted: global.myContact }
        )
    }
}

handler.help = ['رساله']
handler.tags = ['group']
handler.command = /^(رساله)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
