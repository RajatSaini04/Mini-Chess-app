import React, { useState, useCallback, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [moveLog, setMoveLog] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDrop = useCallback((sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move) {
        setGame(new Chess(game.fen()));
        const moveNotation = `${game.turn() === 'w' ? 'Black' : 'White'}: ${move.san}`;
        setMoveLog(prev => [...prev, moveNotation]);
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game]);

  const resetGame = () => {
    setGame(new Chess());
    setMoveLog([]);
  };

  const getGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return "Checkmate!";
      if (game.isDraw()) return "Draw!";
      if (game.isStalemate()) return "Stalemate!";
      return "Game Over!";
    }
    if (game.inCheck()) return "Check!";
    return `${game.turn() === 'w' ? 'White' : 'Black'} to move`;
  };

  return (
    <section id="chess" className="py-20 px-[6vw] font-sans bg-[#0d0b14] text-white min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">CHESS GAME</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">Play and learn from each move</p>
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8 justify-center items-start max-w-6xl mx-auto`}>
        {/* Chessboard */}
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <div className="text-center text-lg font-semibold mb-4 text-purple-400">
            {getGameStatus()}
          </div>

          <div className={`rounded-xl overflow-hidden shadow-lg border border-purple-700 w-full max-w-[500px] aspect-square`}>
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              customDarkSquareStyle={{ backgroundColor: '#5e4b8b' }}
              customLightSquareStyle={{ backgroundColor: '#e0d6f5' }}
              boardOrientation="white"
            />
          </div>

          <button
            onClick={resetGame}
            className="mt-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform shadow-md"
          >
            New Game
          </button>
        </div>

        {/* Move log */}
        <div className={`w-full md:w-1/3 h-[500px] md:h-[500px] bg-[#1c1a29] p-4 rounded-xl border border-white/10 shadow-lg`}>
          <h3 className="text-xl font-bold mb-4 text-purple-300 text-center">Move History</h3>
          <div className="h-full overflow-y-auto space-y-2 pr-1">
            {moveLog.length > 0 ? (
              moveLog.map((move, index) => (
                <div key={index} className="bg-[#2a273d] px-4 py-2 rounded text-sm">
                  {`${Math.floor(index / 2) + 1}. ${move}`}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 italic">No moves yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChessGame;
