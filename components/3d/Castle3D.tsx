"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

export default function Castle3D() {
  const castleRef = useRef<Group>(null);
  const towerRefs = [
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
    useRef<Mesh>(null),
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (castleRef.current) {
      // Gentle floating animation
      castleRef.current.position.y = Math.sin(t * 0.5) * 0.1;
      castleRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    }

    // Animate tower flags
    towerRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.position.y = 2 + Math.sin(t * 2 + i) * 0.05;
      }
    });
  });

  return (
    <group ref={castleRef} scale={[1.5, 1.5, 1.5]}>
      {/* Main Castle Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#8B8680" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Castle Top Battlements */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
        <mesh key={`battlement-${i}`} position={[x, 1.2, 0.8]}>
          <boxGeometry args={[0.3, 0.4, 0.3]} />
          <meshStandardMaterial color="#8B8680" roughness={0.8} />
        </mesh>
      ))}

      {/* Four Corner Towers */}
      {[
        [-1.2, 0, -1.2],
        [1.2, 0, -1.2],
        [-1.2, 0, 1.2],
        [1.2, 0, 1.2],
      ].map((pos, i) => (
        <group key={`tower-${i}`} position={pos as [number, number, number]}>
          {/* Tower Body */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 3, 8]} />
            <meshStandardMaterial color="#8B8680" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Tower Roof */}
          <mesh position={[0, 2.3, 0]}>
            <coneGeometry args={[0.4, 0.8, 8]} />
            <meshStandardMaterial color="#CD7F32" roughness={0.6} metalness={0.4} />
          </mesh>
          {/* Tower Flag */}
          <mesh ref={towerRefs[i]} position={[0, 2, 0]}>
            <boxGeometry args={[0.05, 0.8, 0.05]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Castle Gate */}
      <mesh position={[0, -0.5, 1.01]}>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#2C2416" roughness={0.9} />
      </mesh>

      {/* Windows */}
      {[
        [-0.6, 0.3, 1.01],
        [0.6, 0.3, 1.01],
        [0, 0.8, 1.01],
      ].map((pos, i) => (
        <mesh key={`window-${i}`} position={pos as [number, number, number]}>
          <boxGeometry args={[0.2, 0.3, 0.05]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Gold Banner on front */}
      <mesh position={[0, 1.5, 1.05]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.02]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}
