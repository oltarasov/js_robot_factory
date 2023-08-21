'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (!coords) {
      this.coords = {
        x: 0, y: 0,
      };
    } else {
      this.coords = {
        x: coords.x !== undefined ? coords.x : 0,
        y: coords.y !== undefined ? coords.y : 0,
      };
    }

    this.chipVersion = chipVersion;
  };

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  };

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  };

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  };

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  };

  getInfo() {
    return `Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords && coords.z !== undefined ? coords.z : 0;
  };

  goUp(step = 1) {
    this.coords.z += step;

    return this;
  };

  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  };

  hookLoad(newCurrentLoad) {
    if (this.currentLoad === null) {
      if (this.maxLoadWeight >= newCurrentLoad.weight) {
        this.currentLoad = newCurrentLoad;
      }
    };
  };

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
