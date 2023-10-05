const express = require("express");
const Routes = require("./routes/routes.js");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const passport = require("passport");
const session = require("express-session");
const passportSetup = require("./middlewares/passport.js");
const authRoutes = require("./routes/auth.js");
dotenv.config();

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("successfully connected with mongoDB");
  } catch (err) {
    console.error(err);
  }
};

mongoConnection();

const app = express();

// Initialize session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Use the cors middleware from the package
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Replace with your frontend origin
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(Routes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
