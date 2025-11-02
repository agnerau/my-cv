"use client";

import dynamic from "next/dynamic";

const SmallWorld = dynamic(() => import("../smallWorld/page"), {
  ssr: false,
});

export default function SmallWorldWrapper() {
  return <SmallWorld />;
}
