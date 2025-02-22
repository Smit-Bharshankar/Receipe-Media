import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app.use is used for middleware or configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // for accepting json data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // for accepting encoded data from url
app.use(express.static("public")); // for storing assests in public
app.use(cookieParser()); // for reading and writing cookies in user's browser

// Routes
// import userRouter from "./routes/user.routes.js";

// Routes Declaration
// app.use("/api/v1/users", userRouter); // http://localhost:3000/api/v1/users

export { app };
