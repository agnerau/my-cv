import CircularText from "./components/CircularText";
import DecryptedText from "./components/DecryptedText";

import NickiGameWrapper from "./NickiGameWrapper";
import SmallWorldWrapper from "./SmallWorldWrapper";

export default function Home() {
  return (
    <main className="flex flex-col bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <section className="flex items-center justify-center py-8">
        <CircularText
          text="AGNE*MARIJA*COOL*WEBSITE*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
      </section>

      <section className="flex flex-col items-center justify-center text-center px-8 space-y-8 mt-15 mb-10">
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

      <section className="min-h-screen bg-gray-100 text-gray-900 px-8 py-12 flex flex-col space-y-12 items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-8">PROJECTS</h2>

        <div className="w-full max-w-4xl h-[500px] border border-gray-300 rounded shadow-lg bg-white flex items-center justify-center">
          {/* <NickiGameWrapper /> */}
        </div>

        <div className="w-full max-w-4xl h-[500px] border border-gray-300 rounded shadow-lg bg-white flex items-center justify-center">
          <SmallWorldWrapper />
        </div>

        <div className="w-full max-w-4xl h-[500px] border border-gray-300 rounded shadow-lg bg-white flex items-center justify-center">
          <p className="text-gray-500">Three.js Model Here</p>
        </div>
      </section>

      <footer className="py-6 text-center text-gray-300">
        &copy; {new Date().getFullYear()} Agne Marija. All rights reserved.
      </footer>
    </main>
  );
}
