import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

import ceiling from "/ceiling.png";
import floor from "/floor.png";
import wall1 from "/wall1.png";
import wall2 from "/wall2.png";
import wall3 from "/wall3.png";
import wall4 from "/wall4.png";

export default function Room() {
  const textures = useLoader(THREE.TextureLoader, [
    floor,
    ceiling,
    wall1,
    wall2,
    wall3,
    wall4,
  ]);

  const [floorTexture, ceilingTexture, wall1Texture, wall2Texture, wall3Texture, wall4Texture] = textures;

  const getPlaneSize = (texture) => {
    const image = texture.image;
    const width = image?.width || 1;
    const height = image?.height || 1;
    const scale = 6; // 💡 방을 키우는 값 (4 → 6)
    const ratio = width / height;
    return [ratio * scale, scale];
  };

  const getWallPosition = (texture, axis) => {
    const [w, h] = getPlaneSize(texture);
    const distance = (axis === "x" || axis === "-x" || axis === "z" || axis === "-z") ? w / 2 : h / 2;
    switch (axis) {
      case "x": return [distance, 0, 0];
      case "-x": return [-distance, 0, 0];
      case "z": return [0, 0, distance];
      case "-z": return [0, 0, -distance];
      case "y": return [0, distance, 0];
      case "-y": return [0, -distance, 0];
      default: return [0, 0, 0];
    }
  };

  return (
    <group>
      <mesh position={getWallPosition(floorTexture, "-y")} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={getPlaneSize(floorTexture)} />
        <meshBasicMaterial map={floorTexture} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={getWallPosition(ceilingTexture, "y")} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={getPlaneSize(ceilingTexture)} />
        <meshBasicMaterial map={ceilingTexture} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={getWallPosition(wall1Texture, "-z")} rotation={[0, 0, 0]}>
        <planeGeometry args={getPlaneSize(wall1Texture)} />
        <meshBasicMaterial map={wall1Texture} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={getWallPosition(wall2Texture, "z")} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={getPlaneSize(wall2Texture)} />
        <meshBasicMaterial map={wall2Texture} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={getWallPosition(wall3Texture, "-x")} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={getPlaneSize(wall3Texture)} />
        <meshBasicMaterial map={wall3Texture} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={getWallPosition(wall4Texture, "x")} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={getPlaneSize(wall4Texture)} />
        <meshBasicMaterial map={wall4Texture} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

