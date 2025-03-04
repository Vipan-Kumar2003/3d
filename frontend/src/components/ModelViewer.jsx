import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Smooth auto-rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003; // Slow rotation
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2.5}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={{ cursor: hovered ? "pointer" : "default" }}
    />
  );
};

const Loader = () => (
  <Html center>
    <div style={{ fontSize: "18px", color: "#333", fontWeight: "bold" }}>Loading...</div>
  </Html>
);

const ModelViewer = ({ modelPath, modelName, modelDescription, tags }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: "500px",
        height: "700px",
        margin: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        border: "3px solid #333",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: hovered
          ? "10px 10px 25px rgba(0, 0, 0, 0.4)"
          : "6px 6px 15px rgba(0, 0, 0, 0.25)",
        background: hovered ? "#eaeaea" : "#f7f7f7",
        textAlign: "center",
        transition: "all 0.3s ease-in-out",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>{modelName}</h3>

      {/* 3D Model Container */}
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Canvas camera={{ position: [0, 0, 3], fov: 30 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Environment preset="city" />
          <OrbitControls enableZoom={true} zoomSpeed={2} minDistance={0.5} maxDistance={2} />
          <Suspense fallback={<Loader />}>
            <Model modelPath={modelPath} />
          </Suspense>
        </Canvas>
      </div>

      {/* Description & Tags Container */}
      <div
        style={{
          width: "100%",
          padding: "15px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
          Description
        </p>
        <p style={{ fontSize: "14px", padding: "10px", marginBottom: "10px" }}>
          {modelDescription}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "gray",
            padding: "5px",
            borderRadius: "5px",
            background: "#e0e0e0",
            display: "inline-block",
          }}
        >
          <strong>Tags:</strong> {tags.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ModelViewer;
