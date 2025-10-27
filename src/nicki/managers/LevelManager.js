export default class LevelManager {
  constructor() {
    this.level = 0;
  }

  levelUp() {
    this.level += 1;
  }

  reset() {
    this.level = 0;
  }
}
