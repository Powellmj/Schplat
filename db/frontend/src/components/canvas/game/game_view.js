import 'keymaster'
import Util from './util';

function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.ship = this.game.addShip();
}

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const ship = this.ship;
  const frogtog = e => {
    let velX, velY;
    switch (e.key) {
      case 'w':
        [velX, velY] = Util.dir(ship.vel)
        console.log([velX, velY])
        return ship.power([velX * 1.00, velY * 1.00]);
      case 's':
        [velX, velY] = Util.dir(ship.vel)
        return ship.power([velX * -1.00, velY * -1.00]);
      case ' ':
        return ship.fireBullet();;
    }
  }

  document.addEventListener('keypress', frogtog)
};

GameView.prototype.start = function start() {
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function animate(time) {
  const timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

export default GameView;