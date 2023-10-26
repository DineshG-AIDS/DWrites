import NavBar from "../Components/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axois from "axios";
import Cookies from "js-cookie";
import Alerts from "../Components/Alert";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import Img from "../Asserts/Logo12.png";
import { Spinner, Tooltip } from "@material-tailwind/react";
import ShareBtn from "../Components/ShareBtn";
import { useLocation } from "react-router-dom";

const SinglePostScreen = () => {
  const [userData, SetUserData] = useState({});
  let { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dates, SetDate] = useState("");
  const [timer, SetTimer] = useState(false);
  const [IsLoading, SetLoading] = useState(false);
  const [UserId, SetUserId] = useState("");
  const [USerIdFromDb, SetUserIdFromDb] = useState("");
  const [EditAuth, SetEditAuth] = useState(false);

  document.title = userData.title ? `Dwrite | ${userData.title}` : "Dwrites";
  useEffect(() => {
    let token = Cookies.get("token");
    setIsLoggedIn(!!token);

    Axois.get("http://localhost:4000/user", { withCredentials: true })
      .then((res) => {
        let Data = res.data;
        let DecodeData = JSON.parse(Data);
        console.log(DecodeData);
        SetUserId(DecodeData.id);
        if (UserId === USerIdFromDb) {
          SetEditAuth(true);
        } else {
          SetEditAuth(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // if (UserId === USerIdFromDb) {
    //   SetEditAuth(true);
    // }
    Axois.get(`http://localhost:4000/post/${id}`)
      .then((res) => {
        console.log(res);
        if (res) SetUserData(res.data);
        SetDate(res.data.createdAt);
        SetUserIdFromDb(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        SetLoading(true);
      });
    console.log(EditAuth);
  }, [UserId, USerIdFromDb]);

  let originalDate = new Date(dates);
  const monthIndex = originalDate.getMonth();
  const day = originalDate.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${monthNames[monthIndex]} ${day}`;
  setTimeout(() => {
    SetTimer(true);
  }, 1200);
  const location = useLocation();
  return (
    <>
      <div className="h-screen bg-gray-900">
        <NavBar />
        {!isLoggedIn ? (
          <>
            {" "}
            <div className="pt-10">
              {" "}
              <Alerts />
            </div>{" "}
          </>
        ) : (
          ""
        )}
        <div className="mt-10 pl-4">
          <Link to={location.pathname === "/blog" ? "/blog" : "/blog"}>
            <Tooltip
              content="Go Back"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <div
                className="rounded-full pl-8 pr-4 w-24  border-white border-2"
                color="black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
            </Tooltip>
          </Link>
        </div>
        {!IsLoading ? (
          <div className="flex justify-center items-center py-96 bg-gray-900">
            <Spinner className="h-16 w-16 text-center text-yellow-600" />
          </div>
        ) : (
          <>
            <m.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full h-2/3 p-10 z-20 bg-gray-900"
            >
              <div className="absolute inset-0 bg-gray-900 bg-opacity-40 z-20"></div>
              <img
                src={"http://localhost:4000/" + userData.file}
                alt="card-image"
                className="w-full h-full object-cover rounded-3xl border-yellow-600 border-4 relative z-10"
              />
              <h1 className="absolute inset-0 grid w-full h-full place-items-center z-30 text-3xl font-custom text-white">
                {userData.title}
              </h1>
            </m.div>
            {EditAuth && (
              <div className="flex justify-end px-20">
                <Link to={`/edit/${userData._id}`}>
                  <div className="flex items-center justify-end  pl-4 pr-4 rounded-full border-white border-2 w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="yellow"
                      className="w-4 h-4 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    <h1 className="text-end text-yellow-600 font-custom text-xl">
                      Edit
                    </h1>
                  </div>
                </Link>
              </div>
            )}

            {timer && (
              <m.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="flex items-center justify-center bg-gray-900"
              >
                <div className="bg-yellow-600 rounded-3xl p-4 m-2 flex items-center gap-x-4 justify-center">
                  <div className="text-sm font-custom6 flex items-center gap-1 lowercase cursor-default">
                    <Avatar
                      src={userData.profile || Img}
                      size="sm"
                      alt="avatar"
                      withBorder={true}
                      className="p-0.5 mr-1"
                    />
                    <h1>{userData.author}</h1>
                  </div>
                  <div className="text-sm font-custom6 flex items-center gap-1 cursor-default">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm2.25 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    <h1> {formattedDate}</h1>
                  </div>
                  <Link to="/trend">
                    <m.div
                      whileHover={{ scale: 1.3 }}
                      className="text-sm font-custom6 flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                        />
                      </svg>
                      <h1>{userData.category}</h1>
                    </m.div>
                  </Link>
                  <ShareBtn />
                </div>
              </m.div>
            )}

            {timer && (
              <m.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="text-4xl text-center text-yellow-600 font-custom pt-10 bg-gray-900"
              >
                <u>
                  <h1 className="mb-10 bg-gray-900">Summary</h1>
                </u>
                <h1 className="bg-gray-900 border-white border-4 rounded-full p-5 text-base sm:text-sm md:text-xl lg:text-lg xl:text-2xl">
                  {userData.summary}
                </h1>
              </m.div>
            )}

            {/* <hr className="" /> */}
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-custom leading-relaxed text-white p-4 sm:p-8 md:p-16 lg:p-24 xl:p-32 bg-gray-900">
              <div
                dangerouslySetInnerHTML={{
                  __html: userData.content
                    .replace(
                      /<p>/g,
                      '<p style="color: white; background-color: #212121;">'
                    )
                    .replace(
                      /<strong>/g,
                      '<div style="text-align: left; color: yellow; font-size: 20px;"><strong>'
                    )
                    .replace(/<\/strong>/g, "</strong></div>")
                    .replace(
                      /<a/g,
                      '<a style="color: blue; font-weight: 800;"'
                    ),
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SinglePostScreen;
