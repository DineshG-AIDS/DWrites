import NavBar from "../Components/NavBar";
import Svg from "../Asserts/wave22.svg";
import Lottie from "lottie-react";
import Animations2 from "../Asserts/Animation12.json";
import HeaderText from "../Components/HeaderText";
import { motion as m } from "framer-motion";
import { useEffect } from "react";

const HomeScreens = () => {
  useEffect(() => {
    document.title = "Dwrite";
  });
  return (
    <div className="bg-gray-900 min-h-screen  no-scrollbar">
      <NavBar />
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="h-screen flex flex-col justify-between bg-gray-900 overflow-hidden"
      >
        <HeaderText />

        <div className="flex lg:justify-end sm:justify-center items-center h-3/5">
          <m.div
            animate={{ y: 0 }}
            initial={{ y: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="w-full sm:w-1/2 lg:w-2/3 xl:w-1/2 relative"
          >
            <Lottie
              animationData={Animations2}
              className="w-full absolute sm:right-12 top-1/2 transform -translate-y-1/2"
            />
          </m.div>
        </div>

        <m.div
          animate={{ y: 0 }}
          initial={{ y: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img src={Svg} alt="" className="w-full" />
        </m.div>
      </m.div>
    </div>
  );
};

export default HomeScreens;
