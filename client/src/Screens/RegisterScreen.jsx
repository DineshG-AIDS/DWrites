import RegisterForm from "../Components/RegisterForm";
import NavBar from "../Components/NavBar";
import { motion as m } from "framer-motion";

const RegisterScreen = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
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
          <RegisterForm />
        </m.div>
      </m.div>
    </div>
  );
};

export default RegisterScreen;
