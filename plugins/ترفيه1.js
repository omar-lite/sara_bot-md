let handler = m => m 
 handler.all = async function (m) { 
 let chat = global.db.data.chats[m.chat] 
  
 if (/^بوت خرا|بوت زفت|خرا عليك$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *تبا لك ولامثالك ياصعلوق💀* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^يورها$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *يورها بتحبك ياض🫶🏻♥️* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^ماهو اسمك$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *يورها يا حب♡🧸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^من هو سيدك$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, `  *سيدتي اسمها يورويتشي🌸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^اسكتي$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *حاضر🥺* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^بتحبيني$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *اجل كثير 🌸🤍* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
  
 if (/^اين انت$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, `  *انا هنا تحت امرك🪄* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^ياحب$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, `  *يورها في خدمتك🧸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^كم عمرك/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, `  *اسال مامي يورويتشي♡🌸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 }  
  
 if (/^من عمك$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *عمتي هي يورويتشي♡🧸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
     
 if (/^عبيط|يا عبيط|اهبل|غبي$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *بطل تنمر ياعم🔪* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
  if (/^وينك$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *انا هنا معك🌙🌸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
     
 if (/^بحبك$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, ` *واانا اكثر احمم🌸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
  
 if (/^مين هي يورويتشي$/i.test(m.text) ) { //sem prefixo 
     conn.reply(m.chat, `  *هي عمتك🍓🌸* `, m) //wm, null, [['Menu', '#menu']], m) botones :V 
  
 } 
 return !0 } 
 export default handler
