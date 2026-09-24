"use client";

import dynamic from "next/dynamic";

const NeuralScene = dynamic(() => import("@/components/neural-scene"), { ssr: false });

export function ContactBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <NeuralScene />
    </div>
  );
}
