import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function gaussianPeak(x, y, cx, cy, height, spreadX, spreadY) {
  const dx = (x - cx) / spreadX;
  const dy = (y - cy) / spreadY;
  return Math.exp(-(dx * dx + dy * dy)) * height;
}

function ridgeNoise(x, y) {
  return (
    Math.sin(x * 1.4) * 0.18 +
    Math.cos(y * 1.25) * 0.16 +
    Math.sin((x + y) * 2.2) * 0.12 +
    Math.cos((x - y) * 2.8) * 0.1 +
    Math.sin(x * 4.8) * Math.cos(y * 4.6) * 0.06 +
    Math.sin(x * 8.4 + y * 3.2) * 0.045 +
    Math.cos(y * 8.8 - x * 2.6) * 0.04
  );
}

function sharpen(value, power = 1.35) {
  return Math.sign(value) * Math.pow(Math.abs(value), power);
}

function buildTerrainGeometry(size = 10, segments = 150) {
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
  const position = geometry.attributes.position;

  let maxZ = -Infinity;
  const heights = [];

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const distance = Math.sqrt(x * x + y * y);

    const peakA = gaussianPeak(x, y, -2.4, 0.9, 2.2, 1.2, 1.6);
    const peakB = gaussianPeak(x, y, 0.8, 0.2, 3.4, 1.1, 1.0);
    const peakC = gaussianPeak(x, y, 2.6, -0.7, 2.7, 1.0, 1.35);
    const peakD = gaussianPeak(x, y, -0.7, -1.8, 1.5, 1.8, 1.0);

    const base =
      Math.exp(-distance * 0.18) * 0.55 +
      Math.exp(-distance * 0.42) * 0.28;

    const ridges = ridgeNoise(x, y);
    const jagged = sharpen(ridges, 1.75) * 0.5;

    const folds =
      Math.sin((x * 0.9 + y * 1.7) * 1.4) * 0.18 +
      Math.cos((x * 1.6 - y * 0.7) * 1.2) * 0.14;

    const fine =
      Math.sin(x * 11.5) * 0.02 +
      Math.cos(y * 10.8) * 0.02 +
      Math.sin((x + y) * 9.2) * 0.015;

    let z =
      base +
      peakA +
      peakB +
      peakC +
      peakD +
      jagged +
      folds +
      fine;

    z -= gaussianPeak(x, y, 0, 3.2, 0.45, 3.4, 1.2);

    const edgeFalloffX = 1 - Math.min(Math.abs(x) / (size * 0.52), 1);
    const edgeFalloffY = 1 - Math.min(Math.abs(y) / (size * 0.52), 1);
    const edgeFalloff = Math.pow(edgeFalloffX * edgeFalloffY, 0.75);

    z *= edgeFalloff;

    heights.push(z);
    if (z > maxZ) maxZ = z;
  }

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    let z = heights[i];

    const normalized = maxZ > 0 ? z / maxZ : 0;

    // sharpen only the higher zones
    if (normalized > 0.58) {
      const peakFactor = (normalized - 0.58) / 0.42;

      const summitBreak =
        (Math.sin(x * 14.5) + Math.cos(y * 13.8) + Math.sin((x - y) * 11.2)) *
        0.035 *
        peakFactor;

      const spike =
        Math.pow(peakFactor, 1.6) * 0.65;

      z += summitBreak;
      z *= 1 + spike * 0.22;
    }

    // extra jaggedness at the very top
    if (normalized > 0.74) {
      const knife =
        (Math.sin(x * 22) * Math.cos(y * 19) +
          Math.sin((x + y) * 17)) *
        0.03;

      z += knife * ((normalized - 0.74) / 0.26);
    }

    position.setZ(i, z);
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}

function TerrainMesh() {
  const platformRef = useRef();
  const geometry = useMemo(() => buildTerrainGeometry(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (platformRef.current) {
      platformRef.current.rotation.z = t * 0.18; // full platform rotation
      platformRef.current.rotation.x = -1.03 + Math.sin(t * 0.2) * 0.015;
      platformRef.current.rotation.y = Math.sin(t * 0.14) * 0.035;
    }
  });

  return (
    <group ref={platformRef} position={[0, -0.4, -0.2]} scale={0.82}>
      {/* square platform */}
      <mesh position={[0, 0, -0.18]}>
        <planeGeometry args={[10.6, 10.6, 1, 1]} />
        <meshBasicMaterial
          color="#091225"
          transparent
          opacity={0.24}
          wireframe={false}
        />
      </mesh>

      {/* platform outline */}
      <mesh position={[0, 0, -0.17]}>
        <planeGeometry args={[10.6, 10.6, 1, 1]} />
        <meshBasicMaterial
          color="#2dd4ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* main terrain */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#4fd1ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* back glow layer */}
      <mesh geometry={geometry} position={[0, 0, -0.025]}>
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>
    </group>
  );
}

export default TerrainMesh;