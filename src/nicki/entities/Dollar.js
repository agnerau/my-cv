import Entity from "./Entity.js";

export default class Dollar extends Entity {
  constructor(scene, textureKey = "dollar") {
    const x = Phaser.Math.Between(0, scene.scale.width - 64);
    super(scene, x, -64, textureKey);
    this.speed = Phaser.Math.Between(3, 8);
  }
}
