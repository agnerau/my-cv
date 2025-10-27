"use client";

import { useEffect } from "react";

export default function GamePage() {
  useEffect(() => {
    let game: Phaser.Game;
    const loadPhaser = async () => {
      const Phaser = (await import("phaser")).default;
      const StartScene = (await import("../../nicki/scenes/StartScene"))
        .default;
      const MainScene = (await import("../../nicki/scenes/GameScene")).default;
      const GameOverScene = (await import("../../nicki/scenes/GameOverScene"))
        .default;
      const EnterNameScene = (await import("../../nicki/scenes/EnterNameScene"))
        .default;
      const NextLevelScene = (await import("../../nicki/scenes/NextLevelScene"))
        .default;
      const LeaderboardScene = (
        await import("../../nicki/scenes/LeaderboardScene")
      ).default;

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "game-container",
        scene: [
          StartScene,
          MainScene,
          GameOverScene,
          EnterNameScene,
          NextLevelScene,
          LeaderboardScene,
        ],
        physics: { default: "arcade" },
      };

      game = new Phaser.Game(config);
    };

    loadPhaser();

    return () => {
      if (game) game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
}
