import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
import landTopology from "world-atlas/land-110m.json";
import { feature } from "topojson-client";

const GLOBE_RADIUS = 2.08;

function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createLandTexture() {
  const width = 2048;
  const height = 1024;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.clearRect(0, 0, width, height);

  const landFeature = feature(landTopology, landTopology.objects.land);

  const projection = geoEquirectangular().fitSize([width, height], landFeature);

  const path = geoPath(projection, ctx);

  ctx.fillStyle = "#e8efff";
  ctx.beginPath();
  path(landFeature);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

function Atmosphere() {
  const materialRef = useRef();

  useFrame(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.viewVector.value = new THREE.Vector3(0, 0, 1);
  });

  return (
    <mesh scale={1.13}>
      <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        uniforms={{
          c: { value: 0.72 },
          p: { value: 4.6 },
          glowColor: { value: new THREE.Color("#ffffff") },
          viewVector: { value: new THREE.Vector3(0, 0, 1) },
        }}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPositionNormal;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          uniform float c;
          uniform float p;

          varying vec3 vNormal;
          varying vec3 vPositionNormal;

          void main() {
            float intensity = pow(c - dot(vNormal, vPositionNormal), p);
            gl_FragColor = vec4(glowColor, intensity * 0.7);
          }
        `}
      />
    </mesh>
  );
}

function GlobeShell() {
  const landTexture = useMemo(() => createLandTexture(), []);

  return (
    <>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshBasicMaterial color="#020305" />
      </mesh>

      <mesh scale={1.002}>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshStandardMaterial
          map={landTexture || null}
          emissiveMap={landTexture || null}
          emissive="#eef3ff"
          emissiveIntensity={0.34}
          color="#93a3bf"
          transparent
          opacity={0.99}
          roughness={0.9}
          metalness={0.02}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.03}>
        <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
        <meshBasicMaterial
          color="#4fd1ff"
          transparent
          opacity={0.085}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={1.07}>
        <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.065}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={1.1}>
        <sphereGeometry args={[GLOBE_RADIUS, 72, 72]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

function Marker({ lat, lng }) {
  const ref = useRef();

  const position = useMemo(
    () => latLngToVector3(lat, lng, GLOBE_RADIUS + 0.05),
    [lat, lng]
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2) * 0.15;

    const ring = ref.current.children[1];
    const glow = ref.current.children[2];

    if (ring) {
      ring.scale.setScalar(pulse);
      ring.material.opacity = 0.2 + Math.sin(t * 2) * 0.05;
    }

    if (glow) {
      glow.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
      glow.material.opacity = 0.18 + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.042, 18, 18]} />
        <meshBasicMaterial color="#d7ff4d" />
      </mesh>

      <mesh>
        <ringGeometry args={[0.08, 0.13, 40]} />
        <meshBasicMaterial
          color="#d7ff4d"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#d7ff4d" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function GlobeGroup({ lat, lng }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0014;
    }
  });

  return (
    <group ref={ref} rotation={[0.25, -0.62, 0.02]}>
      <GlobeShell />
      <Atmosphere />
      <Marker lat={lat} lng={lng} />
    </group>
  );
}

function Scene({ lat, lng }) {
  return (
    <>
      <ambientLight intensity={0.58} />
      <pointLight position={[5, 5, 5]} intensity={1.15} color="#4fd1ff" />
      <pointLight position={[-5, -3, -5]} intensity={0.58} color="#8b5cf6" />
      <pointLight position={[0, 4, 3]} intensity={0.45} color="#ffffff" />

      <GlobeGroup lat={lat} lng={lng} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
    </>
  );
}

function LocationGlobe({
  city = "Manchester",
  country = "United Kingdom",
  lat = 53.4808,
  lng = -2.2426,
  timeZone = "Europe/London",
}) {
  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeNow(new Date());
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const formattedTime = useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timeNow);
  }, [timeNow, timeZone]);

  return (
    <div className="location-globe-card">
      <div className="location-globe__meta">
        <div className="location-globe__row">
          <span className="location-globe__pin" aria-hidden="true">
            ●
          </span>

          <p className="location-globe__location">
            <span className="location-globe__label">Location</span>
            <span className="location-globe__divider">•</span>
            <span className="location-globe__value">
              {city}, {country}
            </span>
          </p>
        </div>

        <p className="location-globe__time">
          <span className="location-globe__time-label">Local time:</span>{" "}
          {formattedTime}
        </p>
      </div>

      <div className="location-globe__visual">
        <div className="location-globe__glow location-globe__glow--cyan" />
        <div className="location-globe__glow location-globe__glow--purple" />
        <div className="location-globe__glow location-globe__glow--white" />

        <div className="location-globe__canvas-shell">
          <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 7], fov: 30 }}>
            <Scene lat={lat} lng={lng} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default LocationGlobe;