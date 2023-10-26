import NavBar from "../Components/NavBar";
import { useEffect } from "react";
import Carosel from "../Components/Carosel";
import CardAbout from "../Components/CardAbout";

const AboutUsScreen = () => {
  useEffect(() => {
    document.title = "Dwrite | About us";
  });
  return (
    <>
      <div className="bg-gray-900 min-h-screen overflow-hidden">
        <NavBar />
        <div className="font-custom text-center py-20">
          {/* <h1>Who am I ?</h1> */}
          <Carosel />
          <CardAbout />
        </div>
      </div>
    </>
  );
};

export default AboutUsScreen;
