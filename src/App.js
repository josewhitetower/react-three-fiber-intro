import "./App.css";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Box = (props) => {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, "/wood.jpg");
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} {...props} castShadow>
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
};

const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

const Background = () => {
  const texture = useLoader(THREE.TextureLoader, "/autoshop.jpg");
  const { gl } = useThree();
  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture);
  return <primitive object={formatted.texture} attach="background" />;
};

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        shadows
        style={{ backgroundColor: "black" }}
        camera={{ position: [3, 3, 3] }}
      >
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Suspense fallback={null}>
          <Box position={[0, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
        <axesHelper args={[5]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
