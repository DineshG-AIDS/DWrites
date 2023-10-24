// import  from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en.json";
// import ReactTimeAgo from "react-time-ago";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Img from "../Asserts/Logo22.png";
import { Link } from "react-router-dom";

const CardBlog = ({
  title,
  summary,
  file,
  profile,
  content,
  category,
  createdAt,
  author,
  _id,
}) => {
  // TimeAgo.addDefaultLocale(en);
  const [picture, SetPicture] = useState(Img);
  useEffect(() => {
    if (profile) {
      SetPicture(profile);
      console.log(profile);
      // You can access properties of 'profile' here safely
    }
    if (file) {
      console.log(file);
    }
  }, []);

  return (
    <Link to={`/post/${_id}`}>
      <Card className="mt-6 xl:w-96 border-yellow-600 border-4">
        <CardHeader
          color="blue-gray"
          className=" h-56 border-yellow-600 border-4 bg-white"
        >
          <img
            src={"http://localhost:4000/" + file}
            alt="card-image"
            className="rounded-xl"
          />
        </CardHeader>
        <CardBody>
          <div className="flex items-center">
            {" "}
            <Chip
              icon={
                <Avatar
                  size="xl"
                  variant="circular"
                  className="h-full w-96 -translate-x-0.5 border-black border-1.5 "
                  alt={author}
                  src={picture}
                />
              }
              color="yellow"
              size="lg"
              value={
                <Typography
                  variant="large"
                  color="black"
                  className=" font-medium lowercase leading-none font-custom pl-1"
                >
                  {author}
                </Typography>
              }
              className="rounded-full py-2"
            />
          </div>

          <div className="flex flex-col h-40">
            <Tooltip
              placement="bottom-start"
              content={title}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <Typography
                color="blue-gray"
                className="mb-2 mt-5 truncate text-black text-xl font-custom5 "
                style={{ textTransform: "capitalize" }}
              >
                {title}
              </Typography>
            </Tooltip>
            <div className="text-sm font-custom6 text-black flex">
              <h1>
                {" "}
                {/* <svg
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg> */}
                {format(new Date(createdAt), "MMM, d-yyyy")}
              </h1>
            </div>
            {/* <div className="w-fit flex mt-2">
            <Chip
              value={"#  " + category}
              color={0}
              size="sm"
              variant="outlined"
            />
          </div> */}
            <Typography
              className="flex-1 text-black font-custom9 font-thin mt-4  text-lg"
              style={{ maxHeight: "3em", overflow: "hidden" }}
            >
              {summary}
            </Typography>
          </div>
        </CardBody>

        <CardFooter className="flex justify-between">
          <div className="flex items-start">
            {" "}
            {/* <svg
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg> */}
            {/* <p className="ml-2 text-[1rem] font-custom text-black">
            {format(new Date(createdAt), "MMM d,yyyy")}
          </p> */}
            <div className="w-fit flex ">
              <Link to="/trend">
                <Chip
                  value={"#  " + category}
                  color="black"
                  size="sm"
                  variant="outlined"
                />
              </Link>
            </div>
          </div>

          <div>
            <Link to={`/post/${_id}`}>
              <Tooltip
                content="Read more"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <div
                  className="rounded-full pl-5 pr-5 border-black border-2"
                  color="black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div>
              </Tooltip>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardBlog;
