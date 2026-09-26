import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const N = 46;
const LIME = new THREE.Color("#c5ff3d");
const IRIS = new THREE.Color("#8b7dff");

// window-level pointer, so the sculpture reacts even when the cursor is over the headline
const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Spiral({ reduce }: { reduce: boolean }) {
  const outer = useRef<THREE.Group>(null!);
  const spin = useRef<THREE.Group>(null!);
  const blocks = useRef<THREE.InstancedMesh>(null!);
  const caps = useRef<THREE.InstancedMesh>(null!);
  const progress = useRef(reduce ? 1 : 0);
  const done = useRef(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(
    () =>
      Array.from({ length: N }, (_, i) => {
        const t = i / (N - 1);
        const a = t * Math.PI * 3.3;
        const r = 1.85 - t * 0.6;
        return {
          t,
          a,
          x: Math.cos(a) * r,
          z: Math.sin(a) * r,
          y: -1.9 + t * 2.35,
          h: 0.16 + Math.pow(t, 1.35) * 1.45,
        };
      }),
    []
  );

  const write = (p: number) => {
    data.forEach((d, i) => {
      const g = easeOut(clamp01((p - d.t * 0.55) / 0.45));
      const h = Math.max(0.0001, d.h * g);
      dummy.position.set(d.x, d.y + h / 2, d.z);
      dummy.rotation.set(0, -d.a, 0);
      dummy.scale.set(0.24, h, 0.24);
      dummy.updateMatrix();
      blocks.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(d.x, d.y + h + 0.012, d.z);
      dummy.scale.set(0.245 * (g > 0.01 ? 1 : 0.0001), 0.022, 0.245);
      dummy.updateMatrix();
      caps.current.setMatrixAt(i, dummy.matrix);
    });
    blocks.current.instanceMatrix.needsUpdate = true;
    caps.current.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => {
    const c = new THREE.Color();
    data.forEach((d, i) => {
      c.copy(IRIS).lerp(LIME, Math.pow(d.t, 0.75));
      caps.current.setColorAt(i, c);
    });
    if (caps.current.instanceColor) caps.current.instanceColor.needsUpdate = true;
    write(progress.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    if (!done.current) {
      progress.current = Math.min(1, progress.current + d / 2.6);
      write(progress.current);
      if (progress.current >= 1) done.current = true;
    }
    if (!reduce) spin.current.rotation.y += d * 0.14;
    const k = 1 - Math.pow(0.04, d);
    outer.current.rotation.x += (pointer.y * 0.18 + 0.08 - outer.current.rotation.x) * k;
    outer.current.rotation.z += (-pointer.x * 0.08 - outer.current.rotation.z) * k;
    outer.current.position.x += (pointer.x * 0.15 - outer.current.position.x) * k;
  });

  return (
    <group ref={outer} scale={0.92} position={[0, 0.15, 0]}>
      <group ref={spin}>
        <instancedMesh ref={blocks} args={[undefined, undefined, N]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial color="#1b2238" metalness={0.35} roughness={0.22} clearcoat={1} clearcoatRoughness={0.15} />
        </instancedMesh>
        <instancedMesh ref={caps} args={[undefined, undefined, N]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>

        {/* stem */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 3.1, 8]} />
          <meshBasicMaterial color={LIME} transparent opacity={0.45} />
        </mesh>

        {/* base orbit */}
        <mesh position={[0, -1.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.25, 0.006, 8, 160]} />
          <meshBasicMaterial color={IRIS} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, -1.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 2.2, 96]} />
          <meshBasicMaterial color="#8b7dff" transparent opacity={0.04} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Float speed={reduce ? 0 : 2} floatIntensity={reduce ? 0 : 0.6} rotationIntensity={0}>
        <group position={[0, 1.35, 0]}>
          <mesh>
            <sphereGeometry args={[0.3, 48, 48]} />
            <meshPhysicalMaterial color={LIME} emissive={LIME} emissiveIntensity={0.55} roughness={0.15} clearcoat={1} />
          </mesh>
          <mesh scale={1.9}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshBasicMaterial color={LIME} transparent opacity={0.08} depthWrite={false} />
          </mesh>
          <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
            <torusGeometry args={[0.62, 0.005, 8, 96]} />
            <meshBasicMaterial color={LIME} transparent opacity={0.7} />
          </mesh>
        </group>
      </Float>

      <RisingParticles reduce={reduce} />
    </group>
  );
}

function RisingParticles({ reduce, count = 140 }: { reduce: boolean; count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.4 + Math.random() * 2.6;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = -2 + Math.random() * 4.5;
      positions[i * 3 + 2] = Math.sin(a) * r;
      speeds[i] = 0.1 + Math.random() * 0.35;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, dt) => {
    if (reduce) return;
    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * Math.min(dt, 0.05);
      if (arr[i * 3 + 1] > 2.6) arr[i * 3 + 1] = -2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#e4ffa3" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function GrowthSpiral() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduce = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.6]}
        camera={{ position: [0, 1.1, 10], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, -0.15, 0)}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-3, 1, 2]} intensity={14} color="#8b7dff" />
        <pointLight position={[2, 2.5, 1]} intensity={10} color="#c5ff3d" />
        <Environment resolution={128} frames={1}>
          <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} color="#ffffff" />
          <Lightformer intensity={3} position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#8b7dff" />
          <Lightformer intensity={2} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#c5ff3d" />
        </Environment>
        <Spiral reduce={reduce} />
      </Canvas>
    </div>
  );
}
