import dynamic from "next/dynamic";

const ToteBagScene = dynamic(() => import("../tote/page"), {
  ssr: false,
});

export default function Home() {
  return <ToteBagScene />;
}
