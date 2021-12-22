import "./App.css";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Floor from "./components/Floor";
import Bulb from "./components/Bulb";
import Background from "./components/Background";
import Box from "./components/Box";
import ColorPicker from "./components/ColorPicker";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ColorPicker />
      <Canvas
        shadows
        style={{ backgroundColor: "black" }}
        camera={{ position: [7, 7, 7] }}
      >
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <Suspense fallback={null}>
          <Box position={[3, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Box position={[-3, 1, 0]} />
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
