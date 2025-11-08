import CircularText from "./components/CircularText";
import DecryptedText from "./components/DecryptedText";

import NickiGameWrapper from "./NickiGameWrapper";
import SmallWorldWrapper from "./SmallWorldWrapper";
import ToteBagScene from "@/tote/page";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-white bg-gradient-to-b from-pink-500 via-purple-600 to-pink-600">
      <section className="flex items-center justify-center py-16">
        <CircularText
          text="AGNE*MARIJA*COOL*WEBSITE*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
      </section>

      <section className="flex flex-col items-center justify-center text-center px-8 space-y-8 mt-10 mb-16">
        <h1 className="text-5xl md:text-6xl font-bold">
          TAI i LUPA AR i AKI AR i ANTAKI AUSKARA
        </h1>

        <div className="flex flex-col space-y-4 text-lg md:text-xl font-semibold">
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

      <section className="flex flex-col w-full">
        <h2 className="text-3xl font-bold text-center my-16 tracking-wide">
          PROJECTS
        </h2>

        <div className="min-h-screen flex flex-col md:flex-row items-center px-4 md:pl-8 md:pr-24 ">
          <div className="w-full md:w-2/3 flex items-center justify-center order-2 md:order-1 ">
            <div className="w-[80%] h-[90vh] bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <SmallWorldWrapper />
            </div>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left order-1 md:order-2 space-y-6 p-8">
            <h3 className="text-4xl font-bold">Small World Theory</h3>
            <p className="text-lg text-white font-medium leading-relaxed">
              Small World Theory originally comes from the Six Degrees of
              Separation theory. Frigyes Karinthy proposed the idea that you can
              connect with everyone in the world through a chain of at most six
              people. Later, Duncan Watts and Steven Strogatz proved this
              mathematically by creating various connectivity graphs and
              calculating separation degrees.
              <br />
              <br />
              In the graph on the left, you can see a simplified version of this
              model. You can select your country, specify how many friends you
              have, and indicate how many loose connections you maintain. The
              model then calculates the probability of each degree of
              separation. Of course, if you know me, it’s much simpler — the
              first degree is 100%!
              <br />
              <br />
              Explanation:
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
              It’s fascinating how this demonstrates that we are more connected
              than we realize, and that the world is actually small. The
              small-world effect can even be observed in gene networks and the
              Internet — everything is connected!
            </p>
          </div>
        </div>

        <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-24">
          <div className="w-full md:w-1/2 text-center md:text-right space-y-6 p-8">
            <h3 className="text-4xl font-bold">Tote Bag Scene</h3>
            <p className="text-lg text-white font-medium leading-relaxed">
              Here you can see a 3D model of a tote bag I designed :3. I used
              the Three.js library to create this scene and Blender to apply the
              design to the bag.
              <br />
              <br />
              I try to live as eco-friendly a lifestyle as possible, so a tote
              bag goes with me everywhere I go. I’m really happy that I could
              combine two of my passions — ecology and programming — and finally
              create a 3D showcase.
              <br />
              <br />
              Who knows, maybe one day I’ll even use it to promote my own brand
              or create more eco-friendly products in 3D. For now, it’s a
              playful experiment and a small reminder that technology can
              support a sustainable lifestyle.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-[80%] h-[80vh] bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <ToteBagScene />
            </div>
          </div>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center px-8 md:px-24 space-y-8 ">
          <h3 className="text-4xl font-bold text-center">Nicki Game</h3>

          <div className="w-full  grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center text-white font-medium leading-relaxed ">
            <div className="max-w-xs text-left space-y-4 mx-auto">
              <p className="text-lg text-white font-medium">
                The superstar of all projects – a Nicki Minaj–inspired video
                game! This fun and engaging challenge tests your reflexes and
                strategy. Be careful — enemies attack from all directions!
                <br />
                <br />
                Collect <strong>money</strong> to increase your score, grab the{" "}
                <strong>anaconda</strong> for a bonus boost, and use the{" "}
                <strong>heel</strong> for protection.
              </p>
            </div>

            <div className="flex items-center justify-center rounded-2xl  overflow-hidden  w-[100vh] md:w-[125vh] h-[70vh] mx-auto">
              <NickiGameWrapper />
            </div>

            <div className="max-w-xs text-left space-y-4 mx-auto">
              <p className="text-lg text-white font-medium">
                The game was originally built with <strong>Pygame</strong> and
                later refactored using the <strong>Phaser</strong> library to
                make it playable directly in the browser.
                <br />
                <br />
                Score high enough and you’ll earn a spot on the leaderboard!
                <br />
                <br />
                Good luck and have fun!
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-200 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} Agne Marija. All rights reserved.
      </footer>
    </main>
  );
}
