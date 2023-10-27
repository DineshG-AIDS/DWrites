const express = require("express");
const mongoose = require("mongoose");
///////////////////////
const cors = require("cors");
const bcrypt = require("bcrypt");
//////////////////////////////////////////////////////

const UserModel = require("./Models/UserModel");
const UserGoogleModel = require("./Models/UserGoogleModel");
const PostModel = require("./Models/PostModel");
const fileUpload = require("express-fileupload");

/////////////////////////////////////////////
const CoookieParser = require("cookie-parser");
const buddy_jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");

///////////////////////////
const app = express();
////////////////////////////

app.use("/uploads", express.static(__dirname + "/uploads"));
////////////////////////////

require("dotenv").config();
//////////////////////////////////
const uploadMiddleWare = multer({ dest: "uploads/" });

////////////////////////////////////////
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

  const existingUser = await UserModel.findOne({ username });

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
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  console.log(!user);
  if (!user) {
    return res.status(401).json("User not found");
  }
  const PasswordMatch = bcrypt.compareSync(password, user.passwordEnc);

  try {
    if (PasswordMatch) {
      buddy_jwt.sign({ username, id: user.id }, SuperKey, {}, (err, token) => {
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

//////////////////////////////////////////////////////////////

app.post("/post", uploadMiddleWare.single("file"), async (req, res) => {
  const { originalname, path } = req.file;

  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const NewExr = path + "." + ext;
  fs.renameSync(path, NewExr);
  const { title, summary, content, category } = req.body;
  const { token } = req.cookies;

  buddy_jwt.verify(token, SuperKey1, {}, async (err, info) => {
    if (err) throw err;
    console.log(info);
    const POstDoc = await PostModel.create({
      title,
      summary,
      content: content,
      file: NewExr,
      category,
      author: info.username,
      profile: info?.profile,
      id: info?.id,
    });
    // console.log(info.id);
    res.json(POstDoc).status(200);
    console.log(info.id);
  });
});

///////////////////////////////////////////////////////

app.get("/post", async (req, res) => {
  const ITEM_PER_PAGE = 10;
  const page = req.query.page || 1;
  const query = {};

  const Count = await PostModel.estimatedDocumentCount(query);

  const posts = await PostModel.find(query).sort({ createdAt: -1 });
  const PageCount = Math.ceil(Count / ITEM_PER_PAGE);

  // const userData = await UserGoogleModel.findById("author1");
  res.json({
    pagination: {
      Count,
      PageCount,
    },
    posts,
  });
});
///////////////////////////////////////////////////////////

app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  PostModel.findOne({ _id: id })
    .then((data) => res.json(data).status(200))
    .catch((error) => console.log(error));
});

////////////////////////////////////////////////////////////
app.put("/post", uploadMiddleWare.single("file"), async (req, res) => {
  let NewExr; // Declare NewExr outside the if block.

  if (req.file) {
    const { originalname, path } = req.file;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    NewExr = path + "." + ext; // Assign NewExr a value if req.file exists.
    fs.renameSync(path, NewExr);
  }

  const { title, summary, content, category, id } = req.body;

  const PostData = await PostModel.findById(id);

  const Id = JSON.stringify(PostData._id);
  const id1 = JSON.stringify(id);

  const areEqual = Id === id1;
  if (areEqual) {
    await PostData.updateOne({
      title,
      summary,
      content,
      category,
      file: NewExr ? NewExr : PostData.file,
    });
    res.json(PostData).status(200);
  } else {
    res.json("Something went wrong buddy").status(400);
  }
});

////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
