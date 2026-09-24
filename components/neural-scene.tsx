"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, PointMaterial, Points } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function seededOffset(index: number, axis: number) {
  const value = Math.sin(index * 12.9898 + axis * 78.233) * 43758.5453;
  return value - Math.floor(value) - 0.5;
}

function NeuralNetwork() {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();

  const nodes = useMemo(() => {
    const items: THREE.Vector3[] = [];
    for (let layer = 0; layer < 5; layer += 1) {
      const count = layer === 0 || layer === 4 ? 6 : 8;
      for (let i = 0; i < count; i += 1) items.push(new THREE.Vector3((layer - 2) * 1.25, (i - count / 2) * 0.42, Math.sin(i + layer) * 0.58));
    }
    return items;
  }, []);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(900);
    for (let i = 0; i < 300; i += 1) {
      positions[i * 3] = seededOffset(i, 0) * 8;
      positions[i * 3 + 1] = seededOffset(i, 1) * 5;
      positions[i * 3 + 2] = seededOffset(i, 2) * 4;
    }
    return positions;
  }, []);

  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length - 1; i += 1) {
      if (Math.abs(nodes[i].x - nodes[i + 1].x) < 1.4 || i % 3 === 0) lines.push([nodes[i], nodes[i + 1]]);
      if (i + 7 < nodes.length && i % 2 === 0) lines.push([nodes[i], nodes[i + 7]]);
    }
    return lines.slice(0, 52);
  }, [nodes]);

  useFrame((state) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const time = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = pointer.x * 0.18 + Math.sin(time * 0.18) * 0.1;
      group.current.rotation.x = -pointer.y * 0.12 + Math.sin(time * 0.13) * 0.05;
      group.current.position.x = pointer.x * viewport.width * 0.025;
    }
    if (particles.current) particles.current.rotation.y = time * 0.035;
  });

  return (
    <group ref={group} scale={1.05}>
      <Points ref={particles} positions={particlePositions} stride={3} frustumCulled>
        <PointMaterial transparent color="#60efff" size={0.018} sizeAttenuation depthWrite={false} opacity={0.55} />
      </Points>
      {connections.map(([start, end], index) => (
        <Line key={`${index}-${start.x}`} points={[start, end]} color={index % 3 === 0 ? "#8757ff" : "#00d9ff"} lineWidth={0.8} transparent opacity={0.28} />
      ))}
      {nodes.map((node, index) => (
        <mesh key={`${node.x}-${node.y}-${index}`} position={node}>
          <sphereGeometry args={[index % 5 === 0 ? 0.075 : 0.052, 20, 20]} />
          <meshStandardMaterial emissive={index % 4 === 0 ? "#8757ff" : "#00d9ff"} emissiveIntensity={1.5} color={index % 4 === 0 ? "#d8c8ff" : "#bcfbff"} roughness={0.18} />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.6], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 4, 11]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 4]} color="#00d9ff" intensity={18} />
        <pointLight position={[-3, -2, 3]} color="#8757ff" intensity={9} />
        <Suspense fallback={null}>
          <NeuralNetwork />
        </Suspense>
      </Canvas>
    </div>
  );
}
