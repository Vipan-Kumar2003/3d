import { useState } from "react";

const UploadModel = ({ onUpload }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a .glb file to upload.");
      return;
    }

    const newModel = {
      id: Date.now(),
      name,
      path: URL.createObjectURL(file),
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    onUpload(newModel);

    // Reset form
    setName("");
    setDescription("");
    setTags("");
    setFile(null);
  };

  return (
    <div
      style={{
        width: "500px",
        padding: "20px",
        margin: "15px auto",
        textAlign: "center",
        border: "3px solid #333",
        borderRadius: "15px",
        background: "#f7f7f7",
        boxShadow: "6px 6px 15px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h2>Upload New Model</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Model Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} required />
        <input type="file" accept=".glb" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit" style={{ padding: "10px", background: "#333", color: "#fff", borderRadius: "5px", cursor: "pointer" }}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadModel;
