import NavBar from "../Components/NavBar";
import Lottie from "lottie-react";
import Animation1 from "../Asserts/404Anime.json";
import { useEffect } from "react";
// import[useEffect]

const NotFoundScreen = () => {
  useEffect(() => {
    document.title = "Dwrite | Not Found";
  });
  return (
    <>
      <div className="bg-gray-900 min-h-screen overflow-hidden">
        <NavBar />
        <div className="text-white text-center font-custom1 py-10  xl:text-4xl  lg:text-2xl md:text-xl sm:text-xl z-20">
          <h1 className="z-72 py-10">Sorry Page not found🥲</h1>
        </div>
        <div className="flex justify-center overflow-hidden">
          {" "}
          <Lottie
            animationData={Animation1}
            className="max-w-screen-lg w-full sm:w-2/6  "
          />
        </div>
      </div>
    </>
  );
};

export default NotFoundScreen;
