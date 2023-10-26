import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import ProfileCard from "../Components/ProfileCard";
import Lottie from "lottie-react";
import LoadingAnimation1 from "../Asserts/loading4.json";
import Axios from "axios";

const ProfileScreen = () => {
  const [IsLoading, SetLoading] = useState(false);
  const [UserData, SetUserData] = useState("");
  useEffect(() => {
    document.title = "Dwrite | Profile";
    Axios.get("http://localhost:4000/user", { withCredentials: true })
      .then((res) => {
        let data = res.data;
        let decodedData = JSON.parse(data);
        if (res) {
          SetUserData(decodedData);
          // console.log({ ...UserData });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        SetLoading(true);
      });
  }, []);
  return (
    <>
      <div className="bg-gray-900 min-h-screen overflow-hidden">
        <NavBar />
        {!IsLoading ? (
          <div className="flex justify-center items-center py-72 bg-gray-900">
            <Lottie animationData={LoadingAnimation1} className="w-80" />
          </div>
        ) : (
          <>
            <div className="flex justify-center py-32">
              <ProfileCard {...UserData} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileScreen;
