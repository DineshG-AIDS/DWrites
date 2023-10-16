import NavBar from "../Components/NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import Axois from "axios";
import Lottie from "lottie-react";
import Confett from "../Asserts/confetti.json";
import { useNavigate } from "react-router";
import { Select, Option } from "@material-tailwind/react";
// import Drag from "./Drag";
import { Dropzone, FileItem } from "@dropzone-ui/react";

const CreateForm = () => {
  const [title, SetTitle] = useState("");
  const [summary, SetSummary] = useState("");
  const [content, SetContent] = useState("");
  const [file, SetFile] = useState("");
  const [animation, SetAnimation] = useState(false);
  const [slected, Setslected] = useState("");

  // //////////////////////////////////////////
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const updateFiles = (incommingFiles) => {
    // console.log("incomming files", incommingFiles[0]);
    setFiles(incommingFiles);
    SetFile(incommingFiles);
  };
  // console.log(imageSrc);
  // const onDelete = (id) => {
  //   setFiles(files.filter((x) => x.id !== id));
  // };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  // const handleClean = (files) => {
  //   console.log("list cleaned", files);
  // };
  //////////////////////////////////////

  const Navigate = useNavigate();
  const quillStyles = {
    color: "black",
    backgroundColor: "white",
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.set("title", title);
    Data.set("summary", summary);
    Data.set("content", content);
    Data.set("category", slected);
    Data.set("file", file[0].file);
    console.log(content);

    Axois.post("http://localhost:4000/post", Data)
      .then((res) => {
        if (res) {
          SetAnimation(true);
          setTimeout(() => {
            Navigate("/blog");
          }, 2200);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(file[0]);
  };

  const InputHandler = (i, val) => {
    if (i === "title") {
      SetTitle(val);
    }
    if (i === "summary") {
      SetSummary(val);
    }
    if (i === "content") {
      SetContent(val);
    }
    if (i === "slected") {
      Setslected(val);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <NavBar />

      {animation && <Lottie animationData={Confett} width={100} />}
      <div className="text-center py-10 font-custom text-yellow-600 text-3xl">
        <h1>Where the creativity begins</h1>
      </div>
      <form onSubmit={SubmitHandler}>
        <div className="flex flex-col w-1/2 gap-4 mx-auto">
          <input
            type="text"
            className="text-xl p-2 rounded-xl font-custom"
            placeholder="Enter Your Title"
            value={title}
            onChange={(e) => InputHandler("title", e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your Summary"
            className="text-xl p-2 rounded-xl font-custom"
            value={summary}
            onChange={(e) => InputHandler("summary", e.target.value)}
          />
          <div className="xl:w-72">
            <Select
              label="Select Category"
              color="amber"
              className="text-yellow-600 font-custom text-lg"
              size="lg"
              onChange={(e) => InputHandler("slected", e)}
            >
              <Option
                className="text-black font-custom text-lg"
                value="technology"
              >
                Technology
              </Option>
              <Option className="text-black font-custom text-lg" value="earth">
                Earth
              </Option>
              <Option
                className="text-black font-custom text-lg"
                value="front-end"
              >
                Front-End
              </Option>
              <Option
                className="text-black font-custom text-lg"
                value="back-end"
              >
                Back-End
              </Option>
              <Option className="text-black font-custom text-lg" value="others">
                {" "}
                Others
              </Option>
            </Select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/10 lg:w-10/12 xl:w-full flex justify-center mx-auto">
            <Dropzone onChange={updateFiles} value={files}>
              {files.map((file) => (
                <FileItem {...file} onSee={handleSee} preview />
              ))}
            </Dropzone>
          </div>

          {/* <input
            type="file"
            onChange={(e) => SetFile(e.target.files)}
            className="text-xl p-2 rounded-xl font-custom text-white"
          /> */}
          <ReactQuill
            theme="snow"
            style={quillStyles}
            value={content}
            className="text"
            onChange={(e) => InputHandler("content", e)}
          />
          <div className="flex justify-center">
            <Button color="yellow" className="w-72 rounded-2xl" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
