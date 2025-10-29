"use client";

import dynamic from "next/dynamic";

const NickiGame = dynamic(() => import("../nicki/Game"), {
  ssr: false,
});

export default function NickiGameWrapper() {
  return <NickiGame />;
}
