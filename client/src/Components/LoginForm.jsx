import { Input, Button } from "@material-tailwind/react";
import Img from "../Asserts/Logo12.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Axois from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SucessAnimation from "../Asserts/sucees.json";
import Lottie from "lottie-react";

const LoginForm = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [redirect, SetRedirect] = useState(false);
  const [IsError, SetIsError] = useState(false);

  const Navigate = useNavigate();

  const SubmitHAndler = (e) => {
    e.preventDefault();
    const UserData = {
      username: email,
      password: password,
    };
    Axois.post("http://localhost:4000/login", UserData, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            Navigate("/");
          }, 3000);

          SetRedirect(true);
        }
      })
      .catch((err) => {
        if (err) {
          SetIsError(true);
        }
      });

    console.log(UserData);
    SetEmail("");
    SetPassword("");
  };

  const UserSubmitDataGoogle = (UserData) => {
    Axois.post("http://localhost:4000/log-gog", UserData, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            Navigate("/");
          }, 2000);

          SetRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const InputHandler = (i, val) => {
    if (i === "email") {
      SetEmail(val);
    }
    if (i === "password") {
      SetPassword(val);
    }
  };

  return (
    <>
      {redirect ? (
        <div className="flex justify-center overflow-hidden">
          <Lottie
            animationData={SucessAnimation}
            className="max-w-screen-lg w-full sm:w-2/6 pt-4 sm:pt-32"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="bg-yellow-600 mt-20 sm:w-1/2 md:w-1/ lg:w-1/2 xl:w-1/4 m-4 p-4 rounded-2xl overflow-hidden">
            <div className="text-center text-black text-4xl pl-4 pt-4 font-custom1 cursor-default">
              <h1>Welcome🍻</h1>
            </div>
            <div className="w-32 mx-auto m-4 bg-white rounded-full p-5">
              <img src={Img} alt="" />
            </div>
            <div className="flex justify-center">
              <div className="flex-row">
                <form onSubmit={SubmitHAndler}>
                  <div className="w-72 sm:w-96  sm:mb-2 font-custom p-5">
                    <Input
                      type="text"
                      color="black"
                      label="Your Username"
                      size="lg"
                      value={email}
                      onChange={(e) => InputHandler("email", e.target.value)}
                    />
                  </div>
                  <div></div>

                  <div className="w-72 sm:w-96 font-custom p-5">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => InputHandler("password", e.target.value)}
                      color="black"
                      label="Your password"
                      size="lg"
                    />
                  </div>
                  {IsError && (
                    <div>
                      <h1 className="text-xl text-red-600 font-custom">
                        User Name or Password seems to worng{" "}
                      </h1>
                    </div>
                  )}
                  <div className="flex pt-4 sm:pt-6 gap-6 m-4 sm:m-6 ">
                    <Link to="/register">
                      <Button
                        color="black"
                        variant="outlined"
                        className="font-custom text-md sm:text-lg rounded-full"
                        fullWidth
                      >
                        Register
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      color="black"
                      className="rounded-full text-lg font-custom1"
                      fullWidth
                    >
                      Login
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

            <div className="w-52   sm:w-72 flex  justify-center pt-4 sm:pt-6 xl:pl-14  rounded-full mb-4 sm:mb-5">
              <GoogleOAuthProvider clientId="976957429910-rd0f8uqns0e19o0h311hm3v2j5nt70st.apps.googleusercontent.com">
                <GoogleLogin
                  shape="pill"
                  onSuccess={(credentialResponse) => {
                    let token = credentialResponse.credential;
                    let res = jwt_decode(token);
                    const UserDataGoogle = {
                      username: res.name,
                      email: res.email,
                      profile: res.picture,
                    };
                    UserSubmitDataGoogle(UserDataGoogle);
                    // console.log(UserDataGoogle);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
