"use client";

import {
  RootState,
  ThreeElements,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const Stars = (props: ThreeElements["mesh"]) => {
  const ref = useRef<THREE.Points>(null!);

  // 星野速度と加速度の配列を作成
  const starVelocities = useMemo(() => new Array(6000).fill(0), []);
  const starAccelerations = useMemo(() => new Array(6000).fill(0.02), []);

  // 星の初期位置をランダムに設定
  const positions = useMemo(() => {
    return new Float32Array(
      [...new Float32Array(6000 * 3)].map((_, i) => {
        switch (i % 3) {
          case 0:
          case 1:
          case 2:
            return Math.random() * 600 - 300;
          default:
            return 0;
        }
      })
    );
  }, []);

  // テクスチャを読み込む
  const sprite = useMemo(() => new THREE.TextureLoader().load("/star.png"), []);

  // 星の動きを制御する
  useFrame((state) => {
    if (
      ref.current &&
      ref.current.geometry &&
      ref.current.geometry.attributes &&
      ref.current.geometry.attributes.position
    ) {
      const positions = ref.current.geometry.attributes.position.array;

      for (let i = 0; i < 6000 * 3; i += 3) {
        starVelocities[i / 3] += starAccelerations[i / 3];
        positions[i + 1] -= starVelocities[i / 3];
        if (positions[i + 1] < -200) {
          positions[i + 1] = 200;
          starVelocities[i / 3] = 0;
        }
      }

      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="positions"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color={0xaaaaaa}
        size={0.7}
        map={sprite}
      />
    </points>
  );
};

export const StarScene = () => {
  const { camera, gl } = useThree<RootState>();

  useEffect(() => {
    const handleResize = () => {
      const paersCamera = camera as THREE.PerspectiveCamera;
      paersCamera.aspect = window.innerWidth / window.innerHeight;
      paersCamera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [camera, gl]);

  return (
    <>
      <Stars />
    </>
  );
};
