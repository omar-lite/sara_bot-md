let handler = async (m, { conn, args, groupMetadata }) => {
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        
        if (!who) throw `✳️ قم بوسم أو منشن شخص ما`
        let warn = global.db.data.users[who].warn
        if (warn > 0) {
          global.db.data.users[who].warn -= 1
          m.reply(`⚠️ *DELWARN*
          
      ▢ الانذارات: *-1*
      ▢ إجمالي الانذارات: *${warn - 1}*`)
          m.reply(`✳️ خفض المسؤول عدد الانذارات، الآن لديك *${warn - 1}* انذار`, who)
        } else if (warn == 0) {
          m.reply('✳️ المستخدم ليس لديه أي انذار')
        }
      }
      
      handler.help = ['delwarn @user']
      handler.tags = ['group']
      handler.command = ['رفع_انذار']
      handler.group = true
      handler.admin = true
      handler.botAdmin = true
      
      export default handler
      
