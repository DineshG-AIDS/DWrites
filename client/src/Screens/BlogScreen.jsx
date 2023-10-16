import { useEffect, useState } from "react";
import Axios from "axios";
import NavBar from "../Components/NavBar";
import CardBlog from "../Components/CardBlog";
import { motion as m } from "framer-motion";

const BlogScreen = () => {
  const [userName, setUserName] = useState("");
  const [dataFromDb, SetDataFromDb] = useState({});

  useEffect(() => {
    document.title = "Dwrite | Blogs";
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:4000/post")
      .then((Res) => {
        if (Res) {
          SetDataFromDb(Res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get("http://localhost:4000/user", { withCredentials: true })
      .then((res) => {
        let data = res.data;
        let decodedData = JSON.parse(data);
        if (res) {
          setUserName(decodedData.username);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(dataFromDb);

  return (
    <div className="bg-gray-900 min-h-screen overflow-hidden scrollbar-hide">
      <NavBar />
      <div className="pt-10 pl-20">
        <h1 className="text-white text-4xl font-custom">
          Welcome back{" "}
          <span className="font-extrabold text-yellow-600">
            {userName?.toLowerCase()}
          </span>
        </h1>
      </div>
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="flex flex-wrap justify-center gap-5 p-4 lg:gap-10 lg:p-10 overflow-x-hidden cursor-pointer"
      >
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col gap-20"
        >
          {" "}
          {dataFromDb.length > 0 &&
            dataFromDb.map((post) => <CardBlog {...post} key={post._id} />)}
        </m.div>
      </m.div>
    </div>
  );
};

export default BlogScreen;
