import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import AvatarC from "./Avatar";

const NavBar = () => {
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoginLoation, SetLoginLocation] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    if (location.pathname === "/login") {
      SetLoginLocation(true);
    }
  }, []);
  useEffect(() => {
    let token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 font-custom lg:text-xl lg:mb-0 lg:mt-0 sm:text-sm lg:flex-row lg:items-center lg:gap-12 text-white">
      <div>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.75 }}
          className="no-scrollbar"
        >
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "bg-yellow-600 pr-4 pl-4 p-2 rounded-full"
                : "text-xl hover:bg-yellow-600 p-2 rounded-full"
            }
          >
            Home
          </Link>
        </motion.li>
      </div>
      {/* <div>
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", bounce: 0.1, duration: 0.75 }}
        >
          <Link
            to="/trend"
            className={
              location.pathname === "/trend"
                ? "bg-yellow-600 pr-4 pl-4 p-2 rounded-full"
                : "text-xl hover:bg-yellow-600 p-2 rounded-full"
            }
          >
            categories
          </Link>
        </motion.li>
      </div> */}
      <div>
        <li>
          <Link
            to="/blog"
            className={
              location.pathname === "/blog"
                ? "bg-yellow-600 pr-4 pl-4 p-2 rounded-full"
                : "text-xl hover:bg-yellow-600 p-2 rounded-full"
            }
          >
            Blog
          </Link>
        </li>
      </div>
      <div>
        <li>
          <Link
            to="/aboutus"
            className={
              location.pathname === "/aboutus"
                ? "bg-yellow-600 pr-4 pl-4 p-2 rounded-full"
                : "text-xl hover:bg-yellow-600 p-2 rounded-full"
            }
          >
            About Us
          </Link>
        </li>
      </div>
    </ul>
  );
  const smallScreen = window.innerWidth < 960;

  return (
    <Navbar className="mx-auto max-w-screen-3xl  px-4 lg:px-8 lg: py-5 z-10 bg-customcolor1 no-scrollbar">
      <div className="container mx-auto flex items-center justify-between text-yellow-600 no-scrollbar">
        <div className="lg:text-4xl sm:text-xl font-custom">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
            className="no-scrollbar"
          >
            <Link to="/">
              <span className="text-5xl text-white">D</span> writes
            </Link>
          </motion.div>
        </div>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex justify-end">
          {!smallScreen && isLoggedIn ? (
            <AvatarC />
          ) : (
            <Link to={!LoginLoation ? "/login" : "/register"}>
              <Button
                color="yellow"
                className="text-lg font-custom1 flex justify-center gap-2 md:gap-5 hidden sm:hidden lg:flex hover:rounded-full"
                size="sm"
              >
                {!LoginLoation ? "Login" : "Register"}
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </Button>
            </Link>
          )}

          {/* {!smallScreen && !isLoggedIn ? (
            ""
          ) : (
            <Link to="/login">
              <Button
                color="yellow"
                className="text-lg font-custom1 flex justify-center gap-2 md:gap-5 hidden sm:hidden lg:flex"
                size="sm"
              >
                Login
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </Button>
            </Link>
          )} */}
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden no-scrollbar"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav} className="text-xl">
        <div className="container mx-auto text-xl">
          <div className="flex justify-start"> {navList}</div>
          {isLoggedIn ? (
            <Link to="/create">
              <Button
                variant="gradient"
                color="yellow"
                size="md"
                fullWidth
                className="mb-2 bg-yellow-600 font-custom1"
              >
                <span>New blog</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                variant="gradient"
                color="yellow"
                size="md"
                fullWidth
                className="mb-2 bg-yellow-600 font-custom1"
              >
                <span>Sign Up</span>
              </Button>
            </Link>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default NavBar;

// useEffect(() => {
//   Axios.get("http://localhost:4000/user", { withCredentials: true })
//     .then((res) => {
//       let Data = res.data;
//       let DecodeData = JSON.parse(Data);
//       // SetUserProfile(DecodeData);
//       // SetUserName(DecodeData.username);
//       console.log(DecodeData.username);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   let Img = multiavatar("buddy");
//   // SetProfileIMg(Img);
//   console.log(Img);
//   Axios.get("https://api.multiavatar.com/Starcrasher.png").then((Res) => {
//     if (Res) {
//       SetUserImg(Res.data);
//     }
//   });
// }, []);

// const LogOuthandler = () => {
//   Axios.post("http://localhost:40001/logout", { withCredentials: true }).then(
//     (res) => {
//       if (res) {
//         Cookies.remove("token");

//         Navigate("/login");
//       }
//     }
//   );
// };
