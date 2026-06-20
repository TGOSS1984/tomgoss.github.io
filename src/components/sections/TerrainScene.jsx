import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

const MODEL_PATH = `${import.meta.env.BASE_URL}assets/models/mountain.glb`;

// The canvas paints its own opaque background every frame, so it can't pick
// up theme colours from CSS — it needs its own palette that mirrors the
// surrounding .topo-panel in each theme, and a wireframe colour with enough
// contrast for the text overlaid on top of it to stay legible.
const TERRAIN_PALETTES = {
  dark: {
    background: "#050816",
    fogColor: "#050816",
    baseColor: "#4fd1ff",
    baseOpacityCenter: 0.88,
    baseOpacityAmplitude: 0.05,
    glowColor: "#a5f3fc",
    glowOpacityCenter: 0.26,
    glowOpacityAmplitude: 0.04,
    snowColor: "#ffffff",
  },
  light: {
    background: "#eef4fb",
    fogColor: "#eef4fb",
    baseColor: "#0c4a6e",
    baseOpacityCenter: 0.94,
    baseOpacityAmplitude: 0.03,
    glowColor: "#0ea5e9",
    glowOpacityCenter: 0.22,
    glowOpacityAmplitude: 0.03,
    snowColor: "#0ea5e9",
  },
};

function SnowParticles({ enabled, color, count = 500 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = Math.random() * 5 + 1.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    return arr;
  }, [count]);

  useFrame(() => {
    if (!enabled || !pointsRef.current) return;

    const attr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i += 1) {
      attr.array[i * 3 + 1] -= 0.022;
      attr.array[i * 3] += Math.sin((i + attr.array[i * 3 + 1]) * 0.018) * 0.002;

      if (attr.array[i * 3 + 1] < -2) {
        attr.array[i * 3] = (Math.random() - 0.5) * 12;
        attr.array[i * 3 + 1] = Math.random() * 5 + 1.5;
        attr.array[i * 3 + 2] = (Math.random() - 0.5) * 12;
      }
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} visible={enabled}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.09}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function MountainModel({ snow = false, palette }) {
  const groupRef = useRef();
  const baseMaterialsRef = useRef([]);
  const glowMaterialsRef = useRef([]);
  const { scene } = useGLTF(MODEL_PATH);

  const { baseModel, glowModel, autoScale } = useMemo(() => {
    const baseClone = scene.clone(true);
    const glowClone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(baseClone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    baseClone.position.x -= center.x;
    baseClone.position.y -= center.y;
    baseClone.position.z -= center.z;

    glowClone.position.x -= center.x;
    glowClone.position.y -= center.y;
    glowClone.position.z -= center.z;

    baseClone.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          wireframe: false,
          transparent: true,
          opacity: 0.72,
          side: THREE.DoubleSide,
          // Scene fog tints geometry toward the fog colour based on camera
          // distance. Since fog colour matches the background here, that
          // washed out a large portion of the mountain in both themes —
          // disabling it keeps the colour consistent across the mesh.
          fog: false,
        });
      }
    });

    glowClone.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          wireframe: false,
          transparent: true,
          opacity: 0.14,
          side: THREE.DoubleSide,
          fog: false,
        });
      }
    });

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 6.2;
    const scale = targetSize / maxDim;

    return {
      baseModel: baseClone,
      glowModel: glowClone,
      autoScale: scale,
    };
  }, [scene]);

  // Collect the cloned meshes' materials and recolour them for the active
  // theme. Runs in a layout effect (before paint) so switching themes never
  // shows a flash of the previous palette's colour.
  useLayoutEffect(() => {
    const baseMaterials = [];
    baseModel.traverse((child) => {
      if (child.isMesh) baseMaterials.push(child.material);
    });
    baseMaterialsRef.current = baseMaterials;

    const glowMaterials = [];
    glowModel.traverse((child) => {
      if (child.isMesh) glowMaterials.push(child.material);
    });
    glowMaterialsRef.current = glowMaterials;

    baseMaterials.forEach((material) => material.color.set(palette.baseColor));
    glowMaterials.forEach((material) => material.color.set(palette.glowColor));
  }, [baseModel, glowModel, palette]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.x = 1.3; // viewing tilt
      groupRef.current.rotation.y = t * 0.35; // horizontal turntable rotation
      groupRef.current.rotation.z = 0; // no vertical spin
    }

    const baseMaterial = baseMaterialsRef.current[0];
    if (baseMaterial) {
      baseMaterial.opacity =
        palette.baseOpacityCenter + Math.sin(t * 1.8) * palette.baseOpacityAmplitude;
    }

    const glowMaterial = glowMaterialsRef.current[0];
    if (glowMaterial) {
      glowMaterial.opacity =
        palette.glowOpacityCenter + Math.sin(t * 1.5) * palette.glowOpacityAmplitude;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      <primitive object={baseModel} scale={autoScale} rotation={[0, 0, 0]} />

      <primitive
        object={glowModel}
        scale={autoScale}
        rotation={[0, 0, 0]}
        position={[0, 0, -0.03]}
      />

      <SnowParticles enabled={snow} color={palette.snowColor} />
    </group>
  );
}

function TerrainScene({ snow = false }) {
  const { isLight } = useTheme();
  const palette = isLight ? TERRAIN_PALETTES.light : TERRAIN_PALETTES.dark;

  return (
    <Canvas camera={{ position: [0, -7.2, 5.0], fov: 42 }} dpr={[1, 1.8]}>
      <color attach="background" args={[palette.background]} />
      <fog attach="fog" args={[palette.fogColor, 6, 16]} />
      <ambientLight intensity={1} />
      <MountainModel snow={snow} palette={palette} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH);

export default TerrainScene;