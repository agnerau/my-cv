"use client";

import CircularText from "./components/CircularText";
import DecryptedText from "./components/DecryptedText";

import NickiGameWrapper from "./NickiGameWrapper";
import SmallWorldWrapper from "./SmallWorldWrapper";
import ToteBagScene from "@/tote/page";

import { useEffect, useState } from "react";

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex flex-col min-h-screen text-white bg-gradient-to-b from-pink-500 via-purple-600 to-pink-600">
      <section className="flex flex-col items-center justify-center text-center min-h-screen px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
        <section className="flex items-center justify-center py-10">
          <CircularText
            text="CERTIFIED*THE*COOLEST*PAGE*"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </section>

        <section className="flex flex-col items-center justify-center text-center px-8 space-y-8 mt-8 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold">
            TRUTH CAN ONLY BE FOUND IN ONE PLACE: THE CODE
            {/* BRACKETS ARE LIKE HUGS FOR CODE */}
          </h1>
          <div className="flex flex-col space-y-4 text-lg md:text-xl font-semibold">
            ― Robert C. Martin
          </div>
          <div className="flex flex-col space-y-4 text-3xl mt-10 font-semibold ">
            <DecryptedText
              text="Hi, I am Agne."
              speed={70}
              animateOn="view"
              revealDirection="start"
              sequential={true}
            />
            <DecryptedText
              text="Welcome to my website."
              speed={70}
              animateOn="view"
              revealDirection="start"
              sequential={true}
            />
          </div>
        </section>
      </section>

      <section className="flex flex-col w-full">
        <h2 className="text-4xl font-bold text-center my-16 tracking-wide">
          ~ PROJECTS ~
        </h2>

        <div className="min-h-screen flex flex-col md:flex-row items-center px-4 md:pl-8 md:pr-24 ">
          <div className="w-full md:w-2/3 flex items-center justify-center order-2 md:order-1 ">
            <div className="w-[80%] h-[90vh]  bg-white rounded-2xl shadow-xl flex items-center justify-center">
              {/* sm:w-[90%] sm:h-[100vh] */}
              <SmallWorldWrapper />
            </div>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left order-1 md:order-2 space-y-6 p-8">
            <h3 className="text-4xl font-bold">Small World Theory</h3>
            <p className="description-text">
              {" "}
              <strong>Frigyes Karinthy</strong> proposed that you can connect
              with everyone in the world through a chain of at most six people.
              Later, <strong>Duncan Watts</strong> and{" "}
              <strong>Steven Strogatz</strong> proved this mathematically by
              creating various connectivity graphs and calculating separation
              degrees.
              <br />
              <br />
              In the graph on the left, you can see a simplified version of this
              model. You can select your <strong>country</strong>, specify how
              many <strong>friends</strong> you have, and indicate how many{" "}
              <strong>loose connections</strong> you maintain. The model then
              calculates the <strong>probability</strong> of each degree of
              separation.
              <br />
              <br />
              <strong>Explanation:</strong>
              <br />
              1° – You know me directly.
              <br />
              2° – We are connected via a mutual friend or loose connection.
              <br />
              3° – For example, your friend is a friend of my friend, creating a
              chain.
              <br />
              And so on…
              <br />
              <br />
              The small-world effect can even be observed in gene networks and
              the Internet — <strong>everything is connected!</strong>
            </p>
          </div>
        </div>

        <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-24">
          <div className="w-full md:w-1/2 text-center md:text-right space-y-6 p-8">
            <h3 className="text-4xl font-bold">Tote Bag Scene</h3>
            <p className="description-text">
              Here you can see a <strong>3D model</strong> of a tote bag I
              designed :3. I used the <strong>Three.js</strong> library to
              create this scene and <strong>Blender</strong> to apply the design
              to the bag.
              <br />
              <br />I try to live as <strong>eco-friendly</strong> as possible,
              so a tote bag goes with me everywhere I go. I’m really happy that
              I could combine two of my passions —{" "}
              <strong>ecology and programming</strong> — and finally create a 3D
              showcase.
              <br />
              <br />
              Who knows, maybe one day I’ll even use it to promote my own brand
              or create more eco-friendly products in 3D. For now, it’s a
              playful experiment and a small reminder that{" "}
              <strong>technology can support a sustainable lifestyle</strong>.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-[80%] h-[80vh] bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <ToteBagScene />
            </div>
          </div>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center px-8 md:px-24 space-y-8 mt-10">
          <h3 className="text-4xl font-bold text-center">Nicki Game</h3>

          <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 items-center text-white font-medium leading-relaxed">
            <div className="max-w-xs text-left space-y-4 mx-auto order-1 md:order-none">
              <p className="description-text">
                And finally, the <strong>superstar</strong> of all projects –
                Nicki Minaj-inspired <strong>video game</strong>! This is a fun
                and engaging game where your goal is to score as many{" "}
                <strong>points</strong> as possible, but be careful —{" "}
                <strong>enemies</strong> attack you from the sky!
                <br />
                <br />
                Collect <strong>money</strong> to increase your score, grab the{" "}
                <strong>anaconda</strong> for an extra points boost, and use the{" "}
                <strong>heel</strong> to protect yourself from enemies.
              </p>
            </div>

            <div className="flex items-center justify-center rounded-2xl overflow-hidden w-full md:w-[125vh] h-[40vh] md:h-[70vh] mx-auto order-2 md:order-none">
              {isDesktop ? (
                <NickiGameWrapper />
              ) : (
                <div className="text-center p-6 bg-black/40 rounded-xl">
                  <p className="text-lg font-semibold">
                    🎮 This game can only be played on a computer.
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    Visit this page on your desktop or laptop to play!
                  </p>
                </div>
              )}
            </div>

            <div className="max-w-xs text-left space-y-4 mx-auto order-3 md:order-none">
              <p className="description-text">
                From a <strong>technical perspective</strong>, the game was
                originally created with <strong>Pygame</strong>, but later
                refactored using the <strong>Phaser</strong> library so it could
                be played directly on the <strong>website</strong>.
                <br />
                <br />
                Score high enough and you’ll earn a spot on the{" "}
                <strong>leaderboard</strong>!
                <br />
                <br />
                Good luck and have <strong>fun!</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-white backdrop-blur-sm">
        &copy; {new Date().getFullYear()} Agne
      </footer>
    </main>
  );
}
