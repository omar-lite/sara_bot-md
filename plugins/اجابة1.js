import similarity from 'similarity'

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return m.reply('~*🪦 هــذا الــلــغــز انــتــهــى بــالــفــعــل!*~')
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].credit += this.tekateki[id][2]
            m.reply(`*┇❐↞✅ إجــابــة صــحــيــحــة↝❐┇*\n*┇❐↞🪙 +${this.tekateki[id][2]} ذهــب↝❐┇*`)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply(`*❤️‍🩹تــقــريــبًــا ~نــجــحــت!~*`)
        else m.reply('*🪦 إجــابــة غــيــر ~صــحــيــحــة!~*')
    }
    return !0
}

handler.credit = 0

export default handler
