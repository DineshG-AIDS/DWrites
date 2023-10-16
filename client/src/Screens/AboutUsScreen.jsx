import NavBar from "../Components/NavBar";
import { useEffect } from "react";

const AboutUsScreen = () => {
  useEffect(() => {
    document.title = "Dwrite | About us";
  });
  return (
    <>
      <div className="bg-gray-900 min-h-screen overflow-hidden">
        <NavBar />
        <h1>Profile screen</h1>
      </div>
    </>
  );
};

export default AboutUsScreen;
