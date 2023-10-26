import React from "react";
import {
  //   Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";
import { motion as m } from "framer-motion";

const ShareBtn = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div
        onClick={handleOpen}
        className="text-sm font-custom6 flex items-center gap-1 lowercase cursor-pointer"
      >
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
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>{" "}
        share
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-gray-900"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="font-custom text-yellow-600 text-2xl">
          Share to Loved ones
        </DialogHeader>

        <DialogBody>
          <div className="flex justify-center gap-x-20">
            <m.div
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <FacebookShareButton
                url="buddyblog.site"
                quote="The Post was interesting so could you give a minute to look at Dwrites"
                hashtag="#dineshG"
              >
                <FacebookIcon
                  round
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                />
              </FacebookShareButton>
            </m.div>
            <m.div
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <WhatsappShareButton
                url="buddyblog.site"
                quote="The Post was interesting so could you give a minute to look at Dwrites"
                hashtag="#dineshG"
              >
                <WhatsappIcon
                  round
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                />
              </WhatsappShareButton>
            </m.div>
            <m.div
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <LinkedinShareButton
                url="buddyblog.site"
                quote="The Post was interesting so could you give a minute to look at Dwrites"
                hashtag="#dineshG"
              >
                <LinkedinIcon
                  round
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                />
              </LinkedinShareButton>
            </m.div>
            <m.div
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <EmailShareButton
                url="buddyblog.site"
                quote="The Post was interesting so could you give a minute to look at Dwrites"
                hashtag="#dineshG"
              >
                <EmailIcon
                  round
                  size={52}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                />
              </EmailShareButton>
            </m.div>
            <m.div
              whileHover={{ scale: 1.3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <TelegramShareButton
                url="buddyblog.site"
                quote="The Post was interesting so could you give a minute to look at Dwrites"
                hashtag="#dineshG"
              >
                <TelegramIcon
                  round
                  size={52}
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                />
              </TelegramShareButton>
            </m.div>
          </div>
        </DialogBody>
        <DialogFooter>
          <m.div
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={handleOpen}
            className="mr-1 font-custom text-lg border-red-500 border-2   pr-3 pl-3 text-red-700 rounded-full cursor-pointer hover:bg-red-400 hover:text-yellow-600"
          >
            <span>Cancel</span>
          </m.div>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ShareBtn;
