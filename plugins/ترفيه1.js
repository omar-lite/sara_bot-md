let handler = async (m, { conn }) => {
  let chat = global.db.data.chats[m.chat];

  if (/^بوت$/i.test(m.text)) {
    conn.reply(m.chat, `*يورها تحت أمرك*`, m);
  }

  if (/^الحمدلله$/i.test(m.text)) {
    conn.reply(m.chat, `*❤️🎗️يارب ديما*`, m);
  }

  if (/^تست$/i.test(m.text)) {
    conn.reply(m.chat, `*يورها شغاله يا حب*`, m);
  }

  if (/^منور|منورة$/i.test(m.text)) {
    conn.reply(m.chat, `بنوري انا🫦🩵`, m);
  }

  if (/^انا جيت$/i.test(m.text)) {
    conn.reply(m.chat, `*منور يا حب🫷🏻🩵*`, m);
  }

  if (/^اخرس$/i.test(m.text)) {
    conn.reply(m.chat, `*حاضر*`, m);
  }

  if (/^حرامي|سارق$/i.test(m.text)) {
    conn.reply(m.chat, `تتهم بريء بالسرقة
من دون تحري او بحث
عن حقيقة ليست ملموسة
ارحنا واعمل شرطي
ثم افتح فمك وثرثر
فكلامك كـجاهل واحد
بل جهلاً ارحم من حديثك
تتصنع دور الشرطي
وكأنك محقق
بالله اصمت ولا تحرج نفسك
ارحنا وارح أعصابك
ان اكرمك الله بعقل
فبسكوتك اقتل جهلك`, m);
  }

  if (/^ملل|مللل|ملللل$/i.test(m.text)) {
    conn.reply(m.chat, `*جروب ميت للاسف*`, m);
  }

  if (/^السلام عليكم$/i.test(m.text)) {
    conn.reply(m.chat, `*وعليكم السلام*`, m);
  }

  if (/^تصبح علي خير|تصبحوا علي خير$/i.test(m.text)) {
    conn.reply(m.chat, `*وانت من اهل الخير ي حبيبي✨💜*`, m);
  }

  if (/^من عمك$/i.test(m.text)) {
    conn.reply(m.chat, `*عمتي هي يورويتشي*`, m);
  }

  if (/^افضل انمي$/i.test(m.text)) {
    conn.reply(m.chat, `ون بيس عمك`, m);
  }

  if (/^باي$/i.test(m.text)) {
    conn.reply(m.chat, `باي`, m);
  }

  if (/^هلا$/i.test(m.text)) {
    conn.reply(m.chat, `هلا`, m);
  }

  if (/^كيفك|عامل ايه$/i.test(m.text)) {
    conn.reply(m.chat, `الحمد لله و انت`, m);
  }
};

handler.all = true;

export default handler;
   
