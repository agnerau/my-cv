"use client";
import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ToteBagModel: React.FC = () => {
  const { scene } = useGLTF("/tote/totebag.glb");
  const texture = useLoader(THREE.TextureLoader, "/tote/lolipop.png");
  <mesh position={[0, 0.4, 0.15]} scale={[0.6, 0.6, 0.6]}>
    <planeGeometry args={[0.8, 0.8]} />
    <meshBasicMaterial map={texture} transparent />
  </mesh>;
  return <primitive object={scene} scale={1.2} position={[0, -1.2, 0]} />;
};

const ToteBagScene: React.FC = () => {
  return (
    <div className="w-full h-[50vh] bg-gradient-to-b from-gray-100 to-white">
      <Canvas
        shadows
        camera={{ position: [1, 1, 6], fov: 90 }}
        style={{ background: "#ffffff" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <group position={[0, -3, 0]}>
          <ToteBagModel />
        </group>

        <OrbitControls enablePan />
      </Canvas>
    </div>
  );
};

export default ToteBagScene;
