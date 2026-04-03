import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function buildTerrainGeometry(size = 8, segments = 90, peakHeight = 2.3) {
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);

    const distance = Math.sqrt(x * x + y * y);

    const mountain =
      Math.exp(-distance * 0.7) * peakHeight +
      Math.exp(-distance * 1.6) * 0.7;

    const ridgeNoise =
      Math.sin(x * 2.6) * 0.08 +
      Math.cos(y * 2.2) * 0.08 +
      Math.sin((x + y) * 3.1) * 0.05 +
      Math.cos((x - y) * 2.4) * 0.05;

    const fineNoise =
      Math.sin(x * 7.5) * 0.015 +
      Math.cos(y * 7.2) * 0.015;

    const falloff = Math.max(0, 1 - distance / (size * 0.55));
    const z = (mountain + ridgeNoise + fineNoise) * falloff;

    position.setZ(i, z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}

function TerrainMesh() {
  const meshRef = useRef();

  const geometry = useMemo(() => buildTerrainGeometry(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.25) * 0.06;
      meshRef.current.rotation.x = -1.05 + Math.sin(t * 0.18) * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color="#4fd1ff"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh geometry={geometry} position={[0, 0, -0.02]}>
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  );
}

export default TerrainMesh;