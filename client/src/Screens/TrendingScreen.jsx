import { useEffect } from "react";
import NavBar from "../Components/NavBar";
// import[useEffect]
const TrendingScreen = () => {
  useEffect(() => {
    document.title = "Dwrite | Trending";
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

export default TrendingScreen;
