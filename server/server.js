const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./Models/UserModel");
const UserGoogleModel = require("./Models/UserGoogleModel");
const CoookieParser = require("cookie-parser");
const buddy_jwt = require("jsonwebtoken");

///////////////////////////
const app = express();
////////////////////////////

require("dotenv").config();

// const saltRounds = 8;

app.use(express.json());
app.use(CoookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

////////////////////////////////////////////////
const url = process.env.MONGO_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected");
});
/////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.json("hello mars").status(200);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json("Email Already Exists. Please use a different email.");
  }

  const userData = await UserModel.create({
    username,
    email,
    passwordEnc: bcrypt.hashSync(password, 8),
  });

  try {
    console.log(userData);
    res.status(200).json("Registration successful");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json("Internal server error");
  }
});
///////////////////////////////////////////////

app.post("/reg-gog", async (req, res) => {
  const { username, email, profile } = req.body;

  const existingUser = await UserGoogleModel.findOne({ email });

  if (existingUser) {
    return res
      .status(409)
      .json("Email Already Exists. Please use a different email.");
  }

  const userData = new UserGoogleModel({ username, email, profile });

  try {
    await userData.save();

    res.status(200).json("Registration successful");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json("Internal server error");
  }
});

/////////////////////////////////////////////////////

let SuperKey = "superKeyBuddy";
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json("User not found");
  }
  const PasswordMatch = bcrypt.compareSync(password, user.passwordEnc);

  try {
    if (PasswordMatch) {
      buddy_jwt.sign({ email, id: user.id }, SuperKey, {}, (err, token) => {
        if (err) {
          console.error("Error during token signing:", err);
          return res.status(500).json("Internal server error");
        }

        res.cookie("token", token).json("Ok");
      });
    } else {
      res.status(401).json("Password incorrect");
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json("Internal server error");
  }
});

/////////////////////////////////////////////////////////

let SuperKey1 = "superKeyBuddy";
app.post("/log-gog", async (req, res) => {
  const { username, email, profile } = req.body;
  const user = await UserGoogleModel.findOne({ email });
  if (!user) {
    return res.status(401).json("User not found");
  }
  console.log(username);
  try {
    buddy_jwt.sign(
      { username, email, profile, id: user.id },
      SuperKey1,
      {},
      (err, token) => {
        if (err) {
          console.error("Error during token signing:", err);
          return res.status(500).json("Internal server error");
        }

        res.cookie("token", token).json("Ok");
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json("Internal server error");
  }
});

//////////////////////////////////////////////////////////////

app.get("/user", (req, res) => {
  const { token } = req.cookies;
  buddy_jwt.verify(token, SuperKey1, {}, (err, info) => {
    if (err) throw err;
    res.json(JSON.stringify(info)).status(200);
  });
});

///////////////////////////////////////////////////////////////

app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(0), 
      httpOnly: true, 
    })
    .json("ok");
});

///////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
