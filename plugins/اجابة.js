let handler = async (m, { conn }) => {
  if (!(m.chat in conn.tekateki)) return m.reply('*لا يوجد لديك أي لغز قيد الحل في هذه الدردشة*')
  let [_, data, __, ___] = conn.tekateki[m.chat]
  conn.reply(m.chat, `الإجابة الصحيحة هي: *${data.response}.*`, conn.tekateki[m.chat][0])
  delete conn.tekateki[m.chat]
}

handler.help = ['اجابة']
handler.tags = ['لعبة']
handler.command = /^اجابة$/i

export default handler
