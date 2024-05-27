import { Chess } from 'chess.js';

const handler = async (m, { conn, args }) => {
  const key = m.chat;
  conn.chess = conn.chess || {};
  let chessData = conn.chess[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    players: [],
    hasJoined: []
  };
  conn.chess[key] = chessData;
  const { gameData, fen, currentTurn, players, hasJoined } = chessData;
  const feature = args[0]?.toLowerCase();

  if (feature === 'حذف') {
    delete conn.chess[key];
    return conn.reply(m.chat, '🏳️ *توقفت لعبة الشطرنج.*', m);
  }

  if (feature === 'انشاء') {
    if (gameData) {
      return conn.reply(m.chat, '⚠️ *اللعبة قيد التقدم بالفعل.*', m);
    }
    chessData.gameData = { status: 'waiting', black: null, white: null };
    return conn.reply(m.chat, '🎮 *بدأت لعبة الشطرنج.*\nفي انتظار انضمام لاعبين آخرين.', m);
  }

  if (feature === 'انضمام') {
    const senderId = m.sender;
    if (players.includes(senderId)) {
      return conn.reply(m.chat, '🙅‍♂️ *لقد انضممت بالفعل إلى هذه اللعبة.*', m);
    }
    if (!gameData || gameData.status !== 'waiting') {
      return conn.reply(m.chat, '⚠️ *لا توجد لعبة شطرنج في انتظار اللاعبين حاليًا.*', m);
    }
    if (players.length >= 2) {
      return conn.reply(m.chat, '👥 *اللاعبون يكفيون بالفعل.*\nستبدأ اللعبة تلقائيا.', m);
    }
    players.push(senderId);
    hasJoined.push(senderId);
    if (players.length === 2) {
      gameData.status = 'ready';
      const [black, white] = Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]];
      gameData.black = black;
      gameData.white = white;
      chessData.currentTurn = white;
      return conn.reply(m.chat, `🙌 *اللاعبون الذين انضموا:*\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n*الاسود:* @${black.split('@')[0]}\n*الابيض:* @${white.split('@')[0]}\n\nالرجاء استخدام *'شطرنج بدأ'* لبدء اللعبة.`, m, { mentions: hasJoined });
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *لقد انضممت إلى لعبة الشطرنج.*\nفي انتظار انضمام لاعبين آخرين.', m);
    }
  }

  if (feature === 'بدأ') {
    if (gameData.status !== 'ready') {
      return conn.reply(m.chat, '⚠️ *لا يمكن بدء اللعبة. انتظر حتى ينضم لاعبان.*', m);
    }
    gameData.status = 'playing';
    const senderId = m.sender;
    if (players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      chessData.fen = fen;
      const encodedFen = encodeURIComponent(fen);
      const turn = `🎲 *دور:* أبيض @${gameData.white.split('@')[0]}`;
      const flipParam = senderId === gameData.black ? '' : '&flip=true';
      const flipParam2 = senderId === gameData.black ? '' : '-flip';
      const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
      try {
        await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [gameData.white] });
      } catch (error) {
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
        await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [gameData.black] });
      }
      return;
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *لقد انضممت إلى لعبة الشطرنج.*\nفي انتظار انضمام اللاعبين الآخرين.', m);
    }
  }

  if (args[0] && args[1]) {
    const senderId = m.sender;
    if (!gameData || gameData.status !== 'playing') {
      return conn.reply(m.chat, '⚠️ *اللعبة لم تبدأ بعد.*', m);
    }
    if (currentTurn !== senderId) {
      return conn.reply(m.chat, `⏳ *انها حاليا ${chessData.currentTurn === gameData.white ? 'الابيض' : 'الاسود'}'دور للتحرك.*`, m, {
        contextInfo: {
          mentionedJid: [currentTurn]
        }
      });
    }
    const chess = new Chess(fen);
    if (chess.isCheckmate()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `⚠️ *لعبة كش ملك.*\n🏳️ *توقفت لعبة الشطرنج.*\n*الفائز:* @${m.sender.split('@')[0]}`, m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    }
    if (chess.isDraw()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `⚠️ *لعبة رسم.*\n🏳️ *توقفت لعبة الشطرنج.*\n*اللاعبين:* ${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}`, m, {
        contextInfo: {
          mentionedJid: hasJoined
        }
      });
    }
    const [from, to] = args;
    try {
      chess.move({ from, to, promotion: 'q' });
    } catch (e) {
      return conn.reply(m.chat, '❌ *حركة غير صالحة.*', m);
    }
    chessData.fen = chess.fen();
    const currentTurnIndex = players.indexOf(currentTurn);
    const nextTurnIndex = (currentTurnIndex + 1) % 2;
    chessData.currentTurn = players[nextTurnIndex];
    const encodedFen = encodeURIComponent(chess.fen());
    const currentColor = chessData.currentTurn === gameData.white ? 'الابيض' : 'الاسود';
    const turn = `🎲 *دور:* ${currentColor}\n @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`;
    const flipParam = senderId === gameData.black ? '' : '&flip=true';
    const flipParam2 = senderId === gameData.black ? '' : '-flip';
    const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
    try {
      await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [chessData.currentTurn] });
    } catch (error) {
      const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
      await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [chessData.currentTurn] });
    }
    chess.deleteComment();
    return;
  }

  if (feature === 'مساعدة') {
    return conn.reply(m.chat, `
      🌟 *أوامر لعبة الشطرنج:*

*شطرنج انشاء* - انشاء لعبة شطرنج
*شطرنج انضمام* - الانضمام إلى لعبة الشطرنج
*شطرنج ابدأ* - بدأ لعبة الشطرنج عند انضمام عضوين
*شطرنج حذف* - الغاء لعبى الشطرنج
*شطرنج [من] [الى]* - تحريك حجر الشطرنج مثال شطرنج a2 b2

*مثال:*
اكتب *شطرنج انشاء* - انشاء لعبة شطرنج
اكتب *شطرنج انضمام* - الانضمام إلى لعبة الشطرنج
    `, m);
  }
  return conn.reply(m.chat, '❓أمر خاطئ. استخدم *" .شطرنج مساعدة "* لرؤية الأوامر المتاحة.', m);
};

handler.help = ['chess [from to]', 'chess delete', 'chess join', 'chess start'];
handler.tags = ['game'];
handler.command = /^(chess|chatur|شطرنج)$/i;

export default handler;
