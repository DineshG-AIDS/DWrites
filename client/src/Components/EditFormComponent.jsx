import NavBar from "../Components/NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Spinner } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Axois from "axios";
import Lottie from "lottie-react";
import Confett from "../Asserts/SucessAnimeEdit.json";
import { useNavigate, useParams } from "react-router";
import { Select, Option } from "@material-tailwind/react";
import { Dropzone, FileItem } from "@dropzone-ui/react";

const EditFormComponent = () => {
  /////////////////////////////////////////////////
  const [title, SetTitle] = useState("");
  const [summary, SetSummary] = useState("");
  const [content, SetContent] = useState("");
  const [file, SetFile] = useState("");
  const [animation, SetAnimation] = useState(false);
  const [slected, Setslected] = useState("");
  const [userData, SetUserData] = useState({});
  const [IsLoading, SetLoading] = useState(false);

  /////////////////////////////////////////////////////////
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  ////////////////////////////////////////////////////////
  const { id } = useParams();

  const updateFiles = (incommingFiles) => {
    // console.log("incomming files", incommingFiles[0]);
    setFiles(incommingFiles);
    SetFile(incommingFiles);
  };
  document.title = "Dwrites | Edit ";
  useEffect(() => {
    // }
    Axois.get(`http://localhost:4000/post/${id}`)
      .then((res) => {
        console.log(res);
        if (res) {
          SetUserData(res.data);
          SetTitle(res.data.title);
          SetSummary(res.data.summary);
          SetContent(res.data.content);
          Setslected(res.data.category);
          //   setFiles(res.data.uploads);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        SetLoading(true);
      });
  }, []);
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    Data.set("title", title);
    Data.set("summary", summary);
    Data.set("content", content);
    Data.set("category", slected);
    Data.set("file", file[0]?.file);
    Data.set("id", id);

    await Axois.put(`http://localhost:4000/post`, Data, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.data) {
          SetAnimation(true);
          setTimeout(() => {
            Navigate(`/post/${id}`);
          }, 2200);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const Navigate = useNavigate();
  const quillStyles = {
    color: "white",
    backgroundColor: "#212121",
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
    <>
      <div className="bg-gray-900 min-h-screen">
        <NavBar />
        {animation ? (
          <Lottie animationData={Confett} />
        ) : (
          <>
            <div className="text-center py-10 font-custom text-yellow-600 text-3xl">
              <h1>Place where the things are getting exicted</h1>
            </div>
            {!IsLoading ? (
              <div className="flex justify-center items-center py-96 bg-gray-900">
                <Spinner className="h-16 w-16 text-center text-yellow-600" />
              </div>
            ) : (
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
                      value={slected}
                      onChange={(e) => InputHandler("slected", e)}
                    >
                      <Option
                        className="text-black font-custom text-lg"
                        value="technology"
                      >
                        Technology
                      </Option>
                      <Option
                        className="text-black font-custom text-lg"
                        value="earth"
                      >
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
                      <Option
                        className="text-black font-custom text-lg"
                        value="others"
                      >
                        {" "}
                        Others
                      </Option>
                    </Select>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/10 lg:w-10/12 xl:w-full flex justify-center mx-auto text-xl text-yellow-600">
                    <Dropzone
                      onChange={updateFiles}
                      value={file}
                      maxFiles={1}
                      className="font-custom text-yellow"
                      va
                    >
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
                  <div>
                    <ReactQuill
                      theme="snow"
                      style={quillStyles}
                      value={content}
                      className="text-white"
                      onChange={(e) => InputHandler("content", e)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      color="yellow"
                      className="w-72 rounded-2xl"
                      type="submit"
                    >
                      Edit Post
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default EditFormComponent;
