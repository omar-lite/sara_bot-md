let timeout = 40000
let poin = 5000
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tokitoki = conn.tokitoki ? conn.tokitoki : {}
    let id = m.chat
    if (id in conn.tokitoki) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tokitoki[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/DK3MK/worker-bot/main/eye.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
*╮──────────────────⟢ـ*
*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثـانـيـة┇❯*
*❐↞┇الـجـائـزة💰↞ +${poin} ذهــب┇❯*
*╯──────────────────⟢ـ*
> *قم بالرد على الرسالة بالإجابة*
> *إسـتـخـدم امـر [ .مـحـفـظـة ] للإستطلاع على الذهب الخاص بك*`.trim()
    conn.tokitoki[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m),
        json,
        setTimeout(() => {
            if (conn.tokitoki[id]) conn.reply(m.chat, `*❮ ⌛┇انتــهــى الــوقــت┇⌛❯*\n*❖↞┇الاجـابـة✅↞*  *${json.name}* *┇❯*`, conn.tokitoki[id][0])
            delete conn.tokitoki[id]
        }, timeout)
    ]
}
handler.help = ['عين']
handler.tags = ['لعبة']
handler.command = /^عين$/i

export default handler
