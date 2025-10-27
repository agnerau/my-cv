import Phaser from "phaser";

import StartScene from "./scenes/StartScene.js";
import GameScene from "./scenes/GameScene.js";
import NextLevelScene from "./scenes/NextLevelScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import EnterNameScene from "./scenes/EnterNameScene.js";
import LeaderboardScene from "./scenes/LeaderboardScene.js";

import { WINDOW_WIDTH, WINDOW_HEIGHT } from "./config.js";

const config = {
  type: Phaser.AUTO,
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    StartScene,
    GameScene,
    NextLevelScene,
    GameOverScene,
    EnterNameScene,
    LeaderboardScene,
  ],
};

new Phaser.Game(config);
