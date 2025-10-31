"use client";

import { useEffect, useRef } from "react";
import { COLORS } from "./config";

export default function Game() {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  let game: Phaser.Game | null = null;

  useEffect(() => {
    const initPhaser = async () => {
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

      if (!gameContainerRef.current) return;
      if (gameContainerRef.current.querySelector("canvas")) return;

      const { clientWidth, clientHeight } = gameContainerRef.current;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameContainerRef.current,
        width: clientWidth,
        height: clientHeight,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        backgroundColor: COLORS.BLACK,
        scene: [
          StartScene,
          GameScene,
          GameOverScene,
          EnterNameScene,
          NextLevelScene,
          LeaderboardScene,
        ],
        physics: { default: "arcade", arcade: { debug: false } },
      };

      game = new Phaser.Game(config);
    };

    initPhaser();

    const handleResize = () => {
      if (!gameContainerRef.current || !game) return;
      const width = gameContainerRef.current.clientWidth;
      const height = gameContainerRef.current.clientHeight;
      game.scale.resize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (game) {
        game.destroy(true);
        game = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div ref={gameContainerRef} className="w-full h-full" />
    </div>
  );
}
