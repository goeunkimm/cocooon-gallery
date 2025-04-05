import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import ceiling from "/ceiling.png";
import floor from "/floor.png";
import wall1 from "/wall1.png";
import wall2 from "/wall2.png";
import wall3 from "/wall3.png";
import wall4 from "/wall4.png";

const roomWidth = 16;
const roomDepth = 9;
const roomHeight = 9;

function Room() {
  const loader = new THREE.TextureLoader();

  const floorTexture = loader.load(floor);
  const ceilingTexture = loader.load(ceiling);
  const wall1Texture = loader.load(wall1);
  const wall2Texture = loader.load(wall2);
  const wall3Texture = loader.load(wall3);
  const wall4Texture = loader.load(wall4);

  return (
    <group>
      {/* 바닥 */}
      <mesh position={[0, -roomHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshBasicMaterial map={floorTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 천장 */}
      <mesh position={[0, roomHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshBasicMaterial map={ceilingTexture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 앞면 */}
      <mesh position={[0, 0, -roomDepth / 2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshBasicMaterial map={wall1Texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 뒷면 */}
      <mesh position={[0, 0, roomDepth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshBasicMaterial map={wall2Texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 왼쪽 벽 */}
      <mesh position={[-roomWidth / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshBasicMaterial map={wall3Texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* 오른쪽 벽 */}
      <mesh position={[roomWidth / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshBasicMaterial map={wall4Texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Controls() {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    camera.position.set(0, 0, 0.1); // 카메라를 방 내부로!
    camera.lookAt(0, 0, 1); // 앞쪽 바라보도록
  }, [camera]);

  useFrame(() => controls.current?.update());

  return (
    <OrbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableZoom={false}
      enablePan={false}
      enableRotate={true}
      rotateSpeed={0.6}
      maxPolarAngle={Math.PI}
      minPolarAngle={0}
    />
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 0.1], fov: 80 }} // fov 조금 더 넓게
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={1.2} />
      <Controls />
      <Room />
    </Canvas>
  );
}
