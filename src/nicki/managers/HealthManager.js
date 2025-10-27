import { scoreManager } from "../config";

export default class HealthManager {
  constructor(scene, initialHealth = 3) {
    this.scene = scene;
    this.health = initialHealth;
  }

  addHealth(amount) {
    this.health += amount;
  }

  minusHealth(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      if (scoreManager) {
        scoreManager.saveScore();
      }
    }
  }

  reset() {
    this.health = 3;
  }
}
