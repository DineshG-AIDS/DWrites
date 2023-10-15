import { Input, Button } from "@material-tailwind/react";
import Img from "../Asserts/Logo12.png";
import { Progress } from "@material-tailwind/react";
import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
// import Confetti from "../Asserts/confetti.json";
// import Lottie from "lottie-react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [passwordOnRegister, setPasswordOnRegister] = useState("");
  const [UserExits, SetUserExits] = useState(false);
  const [redirect, SetRedirect] = useState(false);
  const Navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const UserData = {
      username: userName,
      email: email,
      password: passwordOnRegister,
    };

    Axios.post("http://localhost:4000/register", UserData)
      .then((res) => {
        if (res.status === 200) {
          Navigate("/login");

          SetRedirect(true);
        }
      })
      .catch((err) => {
        console.error(err);
        SetUserExits(true);
      });

    // console.log(UserData);
    setEmail("");
    setUserName("");
    setPasswordOnRegister("");
  };
  const UserDataToDbG = (userData) => {
    Axios.post("http://localhost:4000/reg-gog", userData)
      .then((res) => {
        if (res.status === 200) {
          Navigate("/login");

          SetRedirect(true);
        }
      })
      .catch((Err) => {
        if (Err) {
          SetUserExits(true);
        }
      });
  };

  const inputHandler = (field, value) => {
    if (field === "username") {
      setUserName(value);
    }
    if (field === "email") {
      setEmail(value);
    }
    if (field === "password") {
      setPasswordOnRegister(value);
    }
  };

  return (
    <>
      {redirect}
      <div className="flex justify-center">
        <div className="bg-yellow-600 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 m-5 mt-12 rounded-2xl overflow-hidden">
          <div className="w-32 mx-auto m-4 bg-white rounded-full p-5">
            <img src={Img} alt="" />
          </div>
          <div className="text-center text-black text-xl pl-4 pt-8 pb-10 font-custom1 cursor-default">
            <h1>Create your account🚀</h1>
          </div>
          <div className="flex justify-center">
            <div className="flex-row p-4">
              {" "}
              <form onSubmit={submitHandler}>
                <div className="w-full sm:w-96 mb-5 font-custom">
                  <Input
                    type="text"
                    color="black"
                    label="User name"
                    size="lg"
                    value={userName}
                    onChange={(e) => inputHandler("username", e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-96 mb-5 font-custom">
                  <Input
                    type="email"
                    color="black"
                    label="Enter your email"
                    size="lg"
                    value={email}
                    onChange={(e) => inputHandler("email", e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-96 font-custom">
                  <Input
                    type="password"
                    color="black"
                    label="Enter a password"
                    value={passwordOnRegister}
                    size="lg"
                    onChange={(e) => inputHandler("password", e.target.value)}
                  />
                </div>
                <div>
                  {UserExits && (
                    <div className="text-center  text-xl p-3 text-red-600 font-custom1 font-extrabold">
                      <h1>User Already Exits</h1>
                    </div>
                  )}
                </div>
                <div className="m-5">
                  <Progress value={10} color="red" />
                </div>
                <div className="flex gap-5 justify-center m-8">
                  <Button
                    color="black"
                    variant="outlined"
                    className="font-custom1 xl:text-lg sm:text-sm rounded-full hover:bg-white hover-text-black"
                    fullWidth
                    type="submit"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center">
            <hr className="flex-1 border border-black" />
            <h1 className="text-center mx-2 font-custom1 text-xl">Or</h1>
            <hr className="flex-1 border border-black" />
          </div>
          <div className="w-full xl:pl-32 sm:w-72 flex justify-center pl-5 pt-5 mb-5 rounded-full">
            <div className="rounded-full">
              <GoogleOAuthProvider clientId="976957429910-rd0f8uqns0e19o0h311hm3v2j5nt70st.apps.googleusercontent.com">
                <GoogleLogin
                  shape="pill"
                  onSuccess={(credentialResponse) => {
                    let token = credentialResponse.credential;
                    let res = jwt_decode(token);
                    const userData = {
                      username: res.name,
                      email: res.email,
                      profile: res.picture,
                    };
                    UserDataToDbG(userData);
                    console.log(userData);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
