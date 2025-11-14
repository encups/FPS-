"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

function Sword({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.position.y = position[1] + Math.sin(t) * 0.3;
      ref.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Blade */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.1, 1.5, 0.05]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Blade Tip */}
      <mesh position={[0, 1.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.15, 0.05]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Guard */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.6, 0.08, 0.08]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      {/* Pommel */}
      <mesh position={[0, -0.75, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Shield({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.position.y = position[1] + Math.cos(t * 0.8) * 0.2;
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.3 + Math.PI / 4;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Shield Body */}
      <mesh>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#8B0000" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Gold Cross */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.15, 0.8, 0.02]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.85, 1.05, 0.01]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} wireframe />
      </mesh>
    </group>
  );
}

function Scroll({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.position.y = position[1] + Math.sin(t * 1.2) * 0.25;
      ref.current.rotation.z = Math.sin(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Scroll Paper */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
        <meshStandardMaterial color="#F0E5D8" roughness={0.9} />
      </mesh>
      {/* Top Rod */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      {/* Bottom Rod */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
      {/* Wax Seal */}
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
        <meshStandardMaterial color="#8B0000" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Coin({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed;
      ref.current.position.y = position[1] + Math.sin(t * 1.5) * 0.2;
      ref.current.rotation.y = t * 2;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
      <meshStandardMaterial
        color="#D4AF37"
        metalness={0.9}
        roughness={0.1}
        emissive="#D4AF37"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function FloatingElements() {
  return (
    <group>
      {/* Swords */}
      <Sword position={[-4, 2, -8]} speed={0.8} />
      <Sword position={[4, -1, -6]} speed={1.2} />
      <Sword position={[-3, -2, -10]} speed={0.9} />

      {/* Shields */}
      <Shield position={[3, 1, -7]} speed={0.7} />
      <Shield position={[-5, 0, -9]} speed={1.1} />

      {/* Scrolls */}
      <Scroll position={[5, 3, -5]} speed={0.6} />
      <Scroll position={[-4, -1, -7]} speed={0.9} />
      <Scroll position={[2, -3, -8]} speed={1.3} />

      {/* Coins */}
      <Coin position={[1, 2, -6]} speed={1.0} />
      <Coin position={[-2, 1, -5]} speed={1.4} />
      <Coin position={[4, -2, -7]} speed={0.8} />
      <Coin position={[-3, 3, -9]} speed={1.2} />
      <Coin position={[0, -1, -6]} speed={1.1} />
    </group>
  );
}
