import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function SnowParticles({ enabled, count = 500 }) {
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
        color="#ffffff"
        size={0.09}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function MountainModel({ snow = false }) {
  const groupRef = useRef();
  const materialRef = useRef();
  const glowMaterialRef = useRef();
  const { scene } = useGLTF("/assets/models/mountain.glb");

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
          color: "#4fd1ff",
          wireframe: false,
          transparent: true,
          opacity: 0.96,
          side: THREE.DoubleSide,
        });
      }
    });

    glowClone.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: "#67e8f9",
          wireframe: false,
          transparent: true,
          opacity: .5,
          side: THREE.DoubleSide,
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

  useEffect(() => {
    let firstBaseMaterial = null;
    let firstGlowMaterial = null;

    baseModel.traverse((child) => {
      if (child.isMesh && !firstBaseMaterial) {
        firstBaseMaterial = child.material;
      }
    });

    glowModel.traverse((child) => {
      if (child.isMesh && !firstGlowMaterial) {
        firstGlowMaterial = child.material;
      }
    });

    materialRef.current = firstBaseMaterial;
    glowMaterialRef.current = firstGlowMaterial;
  }, [baseModel, glowModel]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
        groupRef.current.rotation.x = 1.3; // viewing tilt
        groupRef.current.rotation.y = t * 0.35; // horizontal turntable rotation
        groupRef.current.rotation.z = 0; // no vertical spin
    }

    if (materialRef.current) {
      materialRef.current.opacity = 0.72 + Math.sin(t * 1.8) * 0.04;
    }

    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = 0.14 + Math.sin(t * 1.5) * 0.025;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>

      <primitive
        object={baseModel}
        scale={autoScale}
        rotation={[0, 0, 0]}
      />

      <primitive
        object={glowModel}
        scale={autoScale}
        rotation={[0, 0, 0]}
        position={[0, 0, -0.03]}
      />

      <SnowParticles enabled={snow} />
    </group>
  );
}

function TerrainScene({ snow = false }) {
  return (
    <Canvas camera={{ position: [0, -7.2, 5.0], fov: 42 }} dpr={[1, 1.8]}>
      <color attach="background" args={["#050816"]} />
      <fog attach="fog" args={["#050816", 6, 16]} />
      <ambientLight intensity={1} />
      <MountainModel snow={snow} />
    </Canvas>
  );
}

useGLTF.preload("/assets/models/mountain.glb");

export default TerrainScene;