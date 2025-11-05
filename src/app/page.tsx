import CircularText from "./components/CircularText";
import DecryptedText from "./components/DecryptedText";

import NickiGameWrapper from "./NickiGameWrapper";
import SmallWorldWrapper from "./SmallWorldWrapper";
import ToteBagScene from "@/tote/page";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen text-white bg-gradient-to-b from-pink-500 via-purple-600 to-indigo-600">
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
        <h2 className="text-3xl font-bold text-center my-16 tracking-widest">
          PROJECTS
        </h2>

        <div className="min-h-screen flex flex-col md:flex-row items-center px-4 md:pl-8 md:pr-24 ">
          <div className="w-full md:w-2/3 flex items-center justify-center order-2 md:order-1 ">
            <div className="w-[80%] h-[90vh] bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <SmallWorldWrapper />
            </div>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-left order-1 md:order-2 space-y-6 p-8">
            <h3 className="text-4xl font-bold">Small World</h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              A cozy simulation of tiny worlds where interactivity meets
              imagination.
            </p>
          </div>
        </div>

        <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-24">
          <div className="w-full md:w-1/2 text-center md:text-right space-y-6 p-8">
            <h3 className="text-4xl font-bold">Tote Bag Scene</h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              An interactive 3D tote bag showcase built with playful minimalism.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-[80%] h-[80vh] bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <ToteBagScene />
            </div>
          </div>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center px-8 md:px-24 text-center space-y-8">
          <div className="max-w-2xl space-y-4">
            <h3 className="text-4xl font-bold">Nicki Game</h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              A rhythm-inspired interactive experience featuring sound, motion,
              and fun.
            </p>
          </div>

          <div className="w-[80%] md:w-[60%] h-[70vh]  rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
            <NickiGameWrapper />
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-200 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} Agne Marija. All rights reserved.
      </footer>
    </main>
  );
}
