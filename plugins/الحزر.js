import fs from 'fs'

let timeout = 60000
let poin = 999

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, '*لا تــزال هــنــاك ألــغــاز لــم تــتــم الإجــابــة عــلــيــهــا فــي هــذه الــدردشــة*', conn.tekateki[id][0])
        throw false
    }
    let tekateki = JSON.parse(fs.readFileSync(`./src/Game/em.json`))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let _clue = json.response
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `
ⷮ *${json.question}*
*╮──────────────────⟢ـ*
*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)} ثـانـيـة┇*
*❐↞┇الـجـائـزة💰↞ +${poin} ذهــب┇*
*╯──────────────────⟢ـ*
> *قم بالرد على الرسالة بالإجابة الصـحيحة*
> *اكـتـب [ .اجـابـة ] اذا لـم تـعـرف الأجـابـة*
> *اكـتـب [ .اسـتـسـلـم ] للأستسلام ياجبان*
> *إسـتـخـدم امـر [ .مـحـفـظـة ] للإستطلاع على الذهب الخاص بك*`.trim()
    conn.tekateki[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `*❮⌛┇انــتــهــى الــوقــت┇⌛❯* \n *❐↞┇الاجــابــة✅↞ ${json.response}┇*`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}

handler.help = ['tekateki']
handler.tags = ['لعبة']
handler.command = /^(acertijo|حزر|ايموجي|الحزر|pregunta|adivinanza|tekateki)$/i

export default handler
