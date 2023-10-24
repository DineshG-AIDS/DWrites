import { useEffect, useState } from "react";
import Axios from "axios";
import NavBar from "../Components/NavBar";
import CardBlog from "../Components/CardBlog";
import { motion as m } from "framer-motion";
import Alerts from "../Components/Alert";
import Cookies from "js-cookie";
// import { Spinner } from "@material-tailwind/react";
import Lottie from "lottie-react";
import LoadingAnimation1 from "../Asserts/loading4.json";
import NotFound from "../Asserts/Not-found.json";
import Error from "../Asserts/networkErr.json";
import { Link } from "react-router-dom";
const BlogScreen = () => {
  const [userName, setUserName] = useState("");
  const [dataFromDb, SetDataFromDb] = useState({});
  // const [page, SetPage] = useState(1);
  // const [pageCount, SetPageCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [IsLoading, SetLoading] = useState(false);
  const [IsError, SetIsError] = useState(false);

  useEffect(() => {
    document.title = "Dwrite | Blogs";
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:4000/post`, {
      withCredentials: true,
    })
      .then((Res) => {
        console.log(Res.data); // Log the response data
        if (Res) {
          SetDataFromDb(Res.data.posts);
          // SetPageCount(Res.data.pagination.Count);
        }
      })
      .catch((err) => {
        if (err) {
          SetIsError(true);
        }
      })
      .finally(() => {
        SetLoading(true);
      });
    let token = Cookies.get("token");
    setIsLoggedIn(!!token);
    Axios.get("http://localhost:4000/user", { withCredentials: true })
      .then((res) => {
        let data = res.data;
        let decodedData = JSON.parse(data);
        if (res) {
          setUserName(decodedData.username);
        }
      })
      .catch((err) => {
        // if (err) {
        //   SetIsError(true);
        // }
      });
  }, []);
  console.log(dataFromDb);

  // const HandlePrevious = () => {
  //   // e.preventDefault();
  //   SetPage((p) => {
  //     if (p === 1) return p;
  //     return p - 1;
  //   });
  //   console.log("Previous clicked. New page:", page - 1);
  // };
  // const HandleNext = () => {
  //   SetPage((p) => {
  //     if (p === pageCount) return p;
  //     return p + 1;
  //   });
  // };

  return (
    <div className="bg-gray-900 min-h-screen no-scrollbar overflow-y-hidden">
      <NavBar />

      {IsError && (
        <div className="flex justify-center items-center py-72 bg-gray-900">
          {" "}
          <Lottie animationData={Error} className="w-96" />{" "}
        </div>
      )}

      {!IsLoading ? (
        <div className="flex justify-center items-center py-72 bg-gray-900">
          {/* <Spinner className="h-16 w-16 text-center text-yellow-600" /> */}
          <Lottie animationData={LoadingAnimation1} className="w-80" />
        </div>
      ) : (
        <>
          {" "}
          <m.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="pt-10 pl-20"
          >
            <h1 className="text-white xl:text-4xl font-custom">
              {isLoggedIn && (
                <>
                  Welcome Back{" "}
                  <span className="font-extrabold text-yellow-600">
                    {userName?.toLowerCase()}
                  </span>
                </>
              )}
            </h1>
          </m.div>
          <m.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-5 p-4 lg:gap-10 lg:p-10 overflow-x-hidden"
          >
            {!isLoggedIn && <Alerts />}
            <m.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-20 sm:gap-x-0 md:gap-x-20 lg:gap-x-20 "
            >
              {" "}
              {dataFromDb.length > 0 ? (
                dataFromDb.map((post) => (
                  <>
                    {" "}
                    <m.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {" "}
                      <CardBlog {...post} key={post._id} />
                    </m.div>
                  </>
                ))
              ) : (
                <div className="py-20 px-0 bg-gray-900 flex flex-row gap-11 p-32 justify-center items-center">
                  <Lottie animationData={NotFound} className="w-96" />
                  <h1 className="text-yellow-600 font-custom text-3xl">
                    No Blogs Found
                  </h1>
                  {/* <Link>Click to Home</Link> */}
                </div>
              )}
              {/* <button disabled={page === 1} onClick={HandlePrevious}>
          previous{" "}
        </button>
        <button disabled={page === pageCount} onClick={HandleNext}>
          next{" "}
        </button> */}
            </m.div>
          </m.div>
        </>
      )}
    </div>
  );
};

export default BlogScreen;
