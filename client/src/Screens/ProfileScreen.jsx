import NavBar from "../Components/NavBar";
import { useEffect } from "react";
const ProfileScreen = () => {
  useEffect(() => {
    document.title = "Dwrite | Profile";
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

export default ProfileScreen;
