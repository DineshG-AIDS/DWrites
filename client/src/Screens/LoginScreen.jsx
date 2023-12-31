import LoginForm from "../Components/LoginForm";
import NavBar from "../Components/NavBar";
import { motion as m } from "framer-motion";
import { useEffect } from "react";

const LOginScreen = () => {
  useEffect(() => {
    document.title = "Dwrite | Login";
  });
  return (
    <div className="bg-gray-900 min-h-screen no-scrollbar">
      <NavBar />
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="bg-gray-900 h-fit sm:bg-gray-900"
      >
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <LoginForm />
        </m.div>
      </m.div>
    </div>
  );
};

export default LOginScreen;
