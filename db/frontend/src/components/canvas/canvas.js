import React, { useRef, useEffect } from 'react';
import Game from './game/game';
import GameView from './game/game_view';

const Canvas = props => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = Game.DIM_X;
    canvas.height = Game.DIM_Y;

    const ctx = canvas.getContext('2d');
    const game = new Game();
    new GameView(game, ctx).start();
  }, [])

  return <canvas ref={canvasRef} {...props} />
}

export default Canvas