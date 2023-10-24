import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import Img from "../Asserts/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axois from "axios";
import Cookies from "js-cookie";

const AvatarC = () => {
  const [ProfileImg, SetProfileIMg] = useState(Img);
  const [GogleUser, SetGoogleUser] = useState(false);
  const navigate = useNavigate();
  const LogOutHandler = () => {
    // Check if the "token" cookie exists
    const tokenCookie = Cookies.get("token");

    if (tokenCookie) {
      // If the cookie exists, remove it
      Cookies.remove("token");
    }

    // Always redirect to the login page
    navigate("/login");
  };
  useEffect(() => {
    Axois.get("http://localhost:4000/user", { withCredentials: true })
      .then((res) => {
        let Data = res.data;
        let DecodeData = JSON.parse(Data);
        if (res) {
          SetProfileIMg(DecodeData.profile);
        }
        SetGoogleUser(!!DecodeData.profile);
        // console.log(!!DecodeData.profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Menu>
      <MenuHandler>
        {GogleUser ? (
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointe border-yellow-600 border-4 h-18  w-16 "
            src={ProfileImg}
          />
        ) : (
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointe border-yellow-600 border-4 h-18  w-16 "
            src={Img}
          />
        )}
      </MenuHandler>
      <MenuList className="bg-yellow-600">
        <MenuItem className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <Link to="/profile">
            <Typography
              variant="large"
              className="font-normal font-custom5 text-black"
            >
              My Profile
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2 ">
          {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="black"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>

          <Link to="/create">
            <Typography
              variant="large"
              className="font-normal font-custom5 text-black"
            >
              New Blog
            </Typography>
          </Link>
        </MenuItem>

        <hr className="my-2 border-black" />
        <MenuItem className="flex items-center gap-2 z-10 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="red"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
          <Typography
            variant="large"
            className="font-normal font-custom5 text-black"
            onClick={LogOutHandler}
          >
            Log Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarC;
