"use client";

import { useEffect, useRef, useState } from "react";
import { COLORS } from "./config";
import NextImage from "next/image";

export default function Game() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState("");
  let game: Phaser.Game | null = null;

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

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
      setTimeout(() => setLoading(false), 2000);
      setInterval(() => {
        setDots((prev) => (prev.length < 4 ? prev + "." : ""));
      }, 500);
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
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-50 transition-opacity duration-700 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <NextImage
          src="/nicki_assets/img/nicki.png"
          alt="Nicki Loading"
          width={200}
          height={200}
          className="mb-4"
          priority
        />

        <p className="text-xl font-bold tracking-wide">Loading{dots}</p>
      </div>

      <div ref={gameContainerRef} className="w-full h-full" />
    </div>
  );
}
