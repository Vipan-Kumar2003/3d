import { useState } from "react";
import { motion } from "framer-motion";

const UploadModelForm = ({ onAddModel, closeModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !file) {
      alert("Please provide a name and a model file.");
      return;
    }

    const newModel = {
      id: Date.now(),
      name,
      path: URL.createObjectURL(file),
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    onAddModel(newModel);
    closeModal();
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input
        type="text"
        placeholder="Model Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="file"
        accept=".glb,.gltf"
        onChange={(e) => setFile(e.target.files[0])}
        required
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        style={{
          padding: "12px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Upload Model
      </motion.button>
    </motion.form>
  );
};

export default UploadModelForm;
