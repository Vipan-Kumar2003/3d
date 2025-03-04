import { useState } from "react";
import ModelViewer from "./components/ModelViewer";
import Sidebar from "./components/Sidebar";
import { motion } from "framer-motion";

const initialModels = [
  {
    id: 1,
    name: "Air Jordan 1 Low",
    path: "/Air Jordan 1 Low.glb",
    description: "A classic low-top sneaker designed for comfort and style.",
    tags: ["Sneaker", "Sportswear", "Casual"],
  },{
    id: 2,
    name: "Jordan Hex Mule",
    path: "/Jordan Hex Mule.glb",
    description: "A futuristic slip-on mule with a unique design.",
    tags: ["Mule", "Minimalist", "Fashion"],
  },
  {
    id: 3,
    name: "Nike Air Max 97 SE",
    path: "/Nike Air Max 97 SE.glb",
    description: "The iconic Air Max 97 with a sleek and modern look.",
    tags: ["Running", "Sneaker", "Comfort"],
  },
  {
    id: 4,
    name: "Nike Oneonta Next Nature",
    path: "/Nike Oneonta Next Nature.glb",
    description: "A rugged sandal made for outdoor adventures.",
    tags: ["Sandal", "Outdoor", "Eco-friendly"],
  },
  {
    id: 5,
    name: "True Blue and Copper",
    path: "/True Blue and Copper.glb",
    description: "A special edition sneaker with a bold color scheme.",
    tags: ["Limited Edition", "Collector", "Stylish"],
  },

];

function App() {
  const [models, setModels] = useState(initialModels);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
  };

  const handleAddModel = (newModel) => {
    setModels((prevModels) => [...prevModels, newModel]);
  };

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(search)
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar onAddModel={handleAddModel} />

      <div
        style={{
          flexGrow: 1,
          padding: "40px",
          textAlign: "center",
          marginLeft: "250px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "28px",
            color: "#fff",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          3D Model Viewer
        </motion.h1>

        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          placeholder="Search models..."
          value={search}
          onChange={handleSearch}
          style={{
            padding: "12px",
            width: "350px",
            fontSize: "16px",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
        />

        <motion.div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {filteredModels.map((model) => (
            <ModelViewer key={model.id} modelPath={model.path} modelName={model.name} modelDescription={model.description} tags={model.tags} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
