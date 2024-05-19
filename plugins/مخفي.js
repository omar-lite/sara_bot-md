import MessageType from '@adiwajshing/baileys' // Importing MessageType from the baileys library
import { generateWAMessageFromContent } from '@adiwajshing/baileys' // Importing the generateWAMessageFromContent function

let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => conn.decodeJid(u.id)) // Extracting and decoding JIDs of all participants
    let q = m.quoted ? m.quoted : m // If the message is a quoted message, use the quoted message, otherwise use the original message
    let c = m.quoted ? m.quoted : m.msg // If the message is a quoted message, use the quoted message's content, otherwise use the original message's content

    // Generate the message content using the generateWAMessageFromContent function
    const msg = conn.cMod(m.chat,
        generateWAMessageFromContent(m.chat, {
            [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
                text: c || '' // If c is JSON, use c.toJSON(), otherwise create an extendedTextMessage with text c or empty string
            }
        }, {
            quoted: m, // The message being quoted
            userJid: conn.user.id // The user JID
        }),
        text || q.text, // The text to send or the text from the quoted message
        conn.user.jid, // The user JID
        { mentions: users } // Mention all users
    )

    // Relay the generated message to the chat
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

// Define the command help, tags, and requirements
handler.help = ['hidetag']
handler.tags = ['group']
handler.command = ['مخفي'] // The command triggers the handler
handler.group = true // The command can only be used in groups
handler.admin = true // The command can only be used by group admins

export default handler
                          
