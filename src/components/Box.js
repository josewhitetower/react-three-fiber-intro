import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const handlePointerDown = (e) => {
  e.object.active = true;
  if (window.activeMesh) {
    // save it in some state store, not window object
    scaleDown(window.activeMesh);
    window.activeMesh.active = false;
  }
  window.activeMesh = e.object;
};

const handlePointerEnter = (e) => {
  e.object.scale.x = 1.5;
  e.object.scale.y = 1.5;
  e.object.scale.z = 1.5;
};
const scaleDown = (object) => {
  object.scale.x = 1;
  object.scale.y = 1;
  object.scale.z = 1;
};

const handlePointerLeave = (e) => {
  if (!e.object.active) {
    scaleDown(e.object);
  }
};

const Box = (props) => {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, "/wood.jpg");
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

export default Box;
