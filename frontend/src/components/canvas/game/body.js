import Util from './util';
import MovingObject from './moving_object';
import Ship from './ship';
import Bullet from './bullet';

const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 100,
  SPEED: 0
};

function Body(options) {
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = [500, 300];
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
}

Util.inherits(Body, MovingObject);

Body.prototype.collideWith = function collideWith(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
    return true;
  } else if (otherObject instanceof Bullet) {
    this.remove();
    otherObject.remove();
    return true;
  }
  return false;
};

export default Body;