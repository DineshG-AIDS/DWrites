// import  from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

const CardBlog = ({ title, summary, file, content, category, createdAt }) => {
  return (
    <Card className="overflow-hidden flex flex-col lg:flex-row bg-gray-800 text-white font-custom border-amber-500 border-2 w-full max-w-screen-xl mx-auto">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="p-4 lg:w-1/4 rounded-lg"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
          className="rounded-xl w-full"
        />
      </CardHeader>
      <CardBody className="lg:w-1/2 lg:pl-5 w-full">
        <div className="flex items-center justify-between">
          <Typography
            color="white"
            className="font-custom text-yellow-600 lg:text-xl xl:text-3xl sm:text-2xl"
          >
            {title}
          </Typography>
          <div className="flex items-center space-x-3">
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>

            <Typography className="font-normal text-lg font-custom">
              {createdAt}
            </Typography>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="box"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-amber-500 hover:z-10"
            />
          </Tooltip>
          <Typography className="font-normal text-lg font-custom text-amber-100">
            Dinesh buddy
          </Typography>
        </div>
        <Typography
          variant="lead"
          color="white"
          className="mt-6 font-normal font-custom text-xl"
        >
          {summary}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default CardBlog;
