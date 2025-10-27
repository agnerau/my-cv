export default class ScoreManager {
  constructor() {
    this.score = 0;
    this.highScore = 0;
  }

  addPoints(points) {
    this.score += points;
  }

  minusPoints(points) {
    this.score = Math.max(0, this.score - points);
  }

  saveScore() {
    this.highScore += this.score;
    this.resetScore();
  }

  resetScore() {
    this.score = 0;
  }

  resetAll() {
    this.score = 0;
    this.highScore = 0;
  }
}
