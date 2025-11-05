"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ToteBagModel: React.FC = () => {
  const { scene } = useGLTF("/tote/totebag.glb");

  const bagRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (bagRef.current) {
      bagRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group ref={bagRef} scale={1.2} position={[0, -1.2, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const ToteBagScene: React.FC = () => {
  return (
    <div className="w-full h-[80vh] rounded-2xl overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [1, 0.5, 6], fov: 90 }}
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
