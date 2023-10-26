import { Card, Chip, Avatar, Typography } from "@material-tailwind/react";
import Img from "../Asserts/Logo22.png";
import { useState } from "react";

const ProfileCard = ({ username, email, profile }) => {
  const [picture, SetPicture] = useState(Img);
  if (profile) {
    SetPicture(profile);
  }
  return (
    <>
      <Card className="w-96">
        <div className="flex items-center">
          {" "}
          <Chip
            icon={
              <Avatar
                size="xl"
                variant="circular"
                className="h-full w-96 -translate-x-0.5 border-black border-1.5 "
                alt={username}
                src={picture}
              />
            }
            color="black"
            size="lg"
            value={
              <Typography
                variant="large"
                color="white"
                className=" font-medium lowercase leading-none font-custom pl-1"
              >
                {username}
              </Typography>
            }
            className="rounded-full py-2"
          />
        </div>
      </Card>
    </>
  );
};

export default ProfileCard;
