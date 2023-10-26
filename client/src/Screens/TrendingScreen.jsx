import NavBar from "../Components/NavBar";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import LoadingAnimation1 from "../Asserts/loading4.json";
import Axios from "axios";
// import CardBlog from "../Components/CardBlog";

const TrendingScreen = () => {
  document.title = "Dwrite | Category";
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  // const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/post", { withCredentials: true })
      .then((res) => {
        // console.log(res.data.posts);
        if (res) {
          setUserData(res.data.posts);
          // console.log(res.data.posts);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(true);
      });
    // const categoriesSet = new Set();
    // for (let i = 0; i < userData.length; i++) {
    //   const category = userData[i].category;
    //   if (category) {
    //     categoriesSet.add(category);
    //   }
    // }

    // const categories = Array.from(categoriesSet);
    // setTrendings(userData);
  }, []);
  console.log(userData);
  return (
    <>
      <div className="bg-gray-900 min-h-screen overflow-hidden no-scrollbar">
        <NavBar />
        {!isLoading ? (
          <div className="flex justify-center items-center py-72 bg-gray-900">
            <Lottie animationData={LoadingAnimation1} className="w-80" />
          </div>
        ) : (
          <>
            {userData.length > 0 && (
              <>
                {userData.map((e) => {
                  <h1 className="text-white">post.title{e}</h1>;
                })}
              </>
            )}
          </>

          // <div>
          //   {trendings.map((data) => (
          //     <>
          //       <div>
          //         <h1>{data}</h1>
          //         <div className="flex flex-wrap justify-center gap-5 p-4 lg:gap-10 lg:p-10 overflow-x-hidden no-scrollbar">
          //           {/* {userData.map((posts) => {
          //             if (posts.category === data) {
          //               return (
          //                 <div
          //                   key={posts.id}
          //                   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-20 sm:gap-x-0 md:gap-x-20 lg:gap-x-20 no-scrollbar"
          //                 >
          //                   <CardBlog {...posts} />
          //                 </div>
          //               );
          //             }
          //           })} */}
          //         </div>
          //       </div>
          //     </>
          //   ))}
          // </div>
        )}
      </div>
    </>
  );
};

export default TrendingScreen;
