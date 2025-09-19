"use client";

import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {useRoutes} from "../utils/routes"

gsap.registerPlugin(SplitText);

function ShaderPlane({ vertexShader, fragmentShader, uniforms }) {
  const meshRef = useRef(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material;
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function ShaderBackground({
  vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;

    void main() {
      vec2 uv = vUv;
      vec3 col = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0,2,4));
      gl_FragColor = vec4(col, 1.0);
    }
  `,
  uniforms = {},
  className = "w-full h-full",
}) {
  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      ...uniforms,
    }),
    [uniforms]
  );

  return (
    <div className={className}>
      <Canvas className={className}>
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={shaderUniforms}
        />
      </Canvas>
    </div>
  );
}

export default function InfiniteHero() {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

      const h1Split = new SplitText(h1Ref.current, { type: "lines" });
      const pSplit = new SplitText(pRef.current, { type: "lines" });

      gsap.set(bgRef.current, { filter: "blur(28px)" });
      gsap.set(h1Split.lines, { opacity: 0, y: 24, filter: "blur(8px)" });
      gsap.set(pSplit.lines, { opacity: 0, y: 16, filter: "blur(6px)" });
      if (ctas.length) gsap.set(ctas, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(bgRef.current, { filter: "blur(0px)", duration: 1.2 }, 0)
        .to(
          h1Split.lines,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1 },
          0.3
        )
        .to(
          pSplit.lines,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08 },
          "-=0.3"
        )
        .to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.2");

      return () => {
        h1Split.revert();
        pSplit.revert();
      };
    },
    { scope: rootRef }
  );

  const { toLogin, toSignup } = useRoutes();

  return (
    <div
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0" ref={bgRef}>
        <ShaderBackground className="h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_50%,transparent_40%,black_100%)]" />

      <div className="relative z-10 flex h-screen w-full items-center justify-center px-6">
        <div className="text-center">
          <h1
            ref={h1Ref}
            className="mx-auto max-w-2xl lg:max-w-4xl text-[clamp(2.25rem,6vw,4rem)] font-extralight leading-[0.95] tracking-tight"
          >
            Gamezzz: Your Ultimate Game Discovery Hub
          </h1>
          <p
            ref={pRef}
            className="mx-auto mt-4 max-w-2xl text-sm md:text-base font-light tracking-tight text-white/70"
          >
            Discover new games tailored to your preferences and explore a world of endless possibilities.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-row items-center justify-center gap-4"
          >
            <button className="btn btn-secondary hover:bg-white hover:text-pink-500" onClick={toLogin}>Login</button>
            <button className="btn btn-secondary hover:bg-white hover:text-pink-500" onClick={toSignup}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}
