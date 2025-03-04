import { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import UploadModelForm from "./UploadModelForm";

Modal.setAppElement("#root");

const Sidebar = ({ onAddModel }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "250px",
        height: "100vh",
        background: "#1a1a1a",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h2 style={{ fontSize: "22px", marginBottom: "30px" }}>Menu</h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setModalIsOpen(true)}
        style={{
          padding: "12px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
          fontSize: "16px",
          width: "100%",
        }}
      >
        Upload New Model
      </motion.button>

      {/* Modal for Uploading Models */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            width: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            background: "#fff",
          },
        }}
      >
        <h2>Upload New Model</h2>
        <UploadModelForm onAddModel={onAddModel} closeModal={() => setModalIsOpen(false)} />
      </Modal>
    </motion.div>
  );
};

export default Sidebar;
