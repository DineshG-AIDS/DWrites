import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const TrendCard = ({
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
  return (
    <>
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-64">
          <img
            src={"http://localhost:4000/" + file}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography
              color="blue-gray"
              className="font-custom text-xl truncate text-black"
            >
              {title}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal font-custom text-black"
          >
            {format(new Date(createdAt), "MMM, d-yyyy")}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 font-custom text-"
            style={{ maxHeight: "3em", overflow: "hidden" }}
          >
            {summary}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link to={`/post/${_id}`}>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-gray-900   text-yellow-600 font-custom text-md shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 rounded-full"
            >
              Read more{" "}
              {/* <svg
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
            </svg> */}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default TrendCard;
