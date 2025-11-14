"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense } from "react";
import Castle3D from "./Castle3D";
import FloatingElements from "./FloatingElements";
import ParticleSystem from "./ParticleSystem";

export default function HeroScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
      <Canvas>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />

          {/* Lights */}
          <ambientLight intensity={0.3} color="#D4AF37" />
          <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#CD7F32" />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            castShadow
            color="#F0E5D8"
          />

          {/* 3D Elements */}
          <Castle3D />
          <FloatingElements />
          <ParticleSystem count={150} />

          {/* Stars Background */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Fog for depth */}
          <fog attach="fog" args={["#2C2416", 5, 25]} />

          {/* Optional Controls - disabled for user but keep subtle auto-rotation */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
