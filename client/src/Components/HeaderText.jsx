import { Button } from "@material-tailwind/react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const HeaderText = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    let token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <div className="sm:text-start w-30 sm:w-auto ml-5 sm:ml-20 mt-10 sm:mt-36 text-3xl sm:text-4xl z-30 font-custom6">
      <m.h1
        animate={{ y: 0 }}
        initial={{ y: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-yellow-600 stroke-white storke-1 sm:text-4xl lg:text-6xl"
      >
        Stay Connected With
      </m.h1>
      <m.h1
        animate={{ y: 0 }}
        initial={{ y: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-white mt-5 sm:mt-10   text-4xl sm:text-5xl"
      >
        Crunch Media
      </m.h1>
      <m.div
        animate={{ y: 0 }}
        initial={{ y: "100%" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-5 sm:mt-10 text-base  "
      >
        {isLoggedIn ? (
          <Link to="/blog">
            <Button
              color="yellow"
              className="text-xl md font-custom1 flex justify-center gap-1  sm:gap-5"
              size="sm"
            >
              Explore Here
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                width="20px"
                stroke="currentColor"
                className="lg:w-6 h-6 sm:w-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Button>
          </Link>
        ) : (
          <Link to="/register">
            <Button
              color="yellow"
              className="text-lg md font-custom1 flex justify-center gap-2  sm:gap-5"
              size="sm"
            >
              Register
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                width="20px"
                stroke="currentColor"
                className="lg:w-6 h-6 sm:w-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Button>
          </Link>
        )}
      </m.div>
    </div>
  );
};

export default HeaderText;
