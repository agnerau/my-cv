"use client";

import { useEffect, useRef } from "react";
import { COLORS } from "./config";

export default function Game() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let game: any;

  useEffect(() => {
    const loadPhaser = async () => {
      const Phaser = (await import("phaser")).default;

      const StartScene = (await import("../nicki/scenes/StartScene")).default;
      const GameScene = (await import("../nicki/scenes/GameScene")).default;
      const GameOverScene = (await import("../nicki/scenes/GameOverScene"))
        .default;
      const EnterNameScene = (await import("../nicki/scenes/EnterNameScene"))
        .default;
      const NextLevelScene = (await import("../nicki/scenes/NextLevelScene"))
        .default;
      const LeaderboardScene = (
        await import("../nicki/scenes/LeaderboardScene")
      ).default;

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 500,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },

        parent: gameContainerRef.current,
        scene: [
          StartScene,
          GameScene,
          GameOverScene,
          EnterNameScene,
          NextLevelScene,
          LeaderboardScene,
        ],
        physics: { default: "arcade" },
        backgroundColor: COLORS.BLACK,
      };

      game = new Phaser.Game(config);
    };

    loadPhaser();

    return () => {
      if (game) game.destroy(true);
    };
  }, []);

  return <div ref={gameContainerRef} className="w-full h-full" />;
}
