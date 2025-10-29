import LevelManager from "./managers/LevelManager.js";
import ScoreManager from "./managers/ScoreManager.js";
import HealthManager from "./managers/HealthManager.js";
import SpawnManager from "./managers/SpawnManager.js";
import Pause from "./managers/PauseManager.js";
import Dollar from "./entities/Dollar.js";
import Cardi from "./entities/Cardi.js";
import Anaconda from "./entities/Anaconda.js";
import Heel from "./entities/Heel.js";

export const WINDOW_WIDTH = 1280;
export const WINDOW_HEIGHT = 720;

export const COLORS = {
  BLACK: "#000000",
  WHITE: "#ffffff",
  PINK: "#ff69b4",
};

export const levelManager = new LevelManager();
export const scoreManager = new ScoreManager();
export const healthManager = new HealthManager();
export const pause = new Pause();

export const ASSETS = {
  dollars: [
    "assets/img/money_1.png",
    "assets/img/money_2.png",
    "assets/img/money_3.png",
    "assets/img/money_4.png",
  ],
  cardis: [
    "assets/img/cardib_1.png",
    "assets/img/cardib_2.png",
    "assets/img/cardib_3.png",
    "assets/img/cardib_4.png",
  ],
  anaconda: "assets/img/anaconda.png",
  heel: "assets/img/heel.png",
  health: "assets/img/health.png",
};

export function createSpawnManagers(scene: Phaser.Scene) {
  const dollarManager = new SpawnManager(
    scene,
    () => new Dollar(scene, Phaser.Math.RND.pick(ASSETS.dollars)),
    1000,
    { jiter: 200, maxActive: 5 }
  );

  const cardiManager = new SpawnManager(
    scene,
    () => new Cardi(scene, Phaser.Math.RND.pick(ASSETS.cardis)),
    2000,
    { jitter: 200, scaleWithLevel: true, minDelay: 500, maxActive: 5 }
  );

  const anacondaManager = new SpawnManager(
    scene,
    () => new Anaconda(scene, ASSETS.anaconda),
    5000,
    { jitter: 400, scaleWithLevel: false, minDelay: 4000, maxActive: 1 }
  );

  const heelManager = new SpawnManager(
    scene,
    () => new Heel(scene, ASSETS.heel),
    9000,
    { jitter: 800, scaleWithLevel: false, minDelay: 9000, maxActive: 1 }
  );

  return { dollarManager, cardiManager, anacondaManager, heelManager };
}
