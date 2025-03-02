import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app.use is used for middleware or configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        // !origin allows requests from non-browser clients (like Postman)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies to be sent/received
  })
);

app.use(express.json({ limit: "16kb" })); // for accepting json data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // for accepting encoded data from url
app.use(express.static("public")); // for storing assests in public
app.use(cookieParser()); // for reading and writing cookies in user's browser

// Routes
import userRouter from "./routes/user.routes.js";
import recipeRouter from "./routes/recipe.routes.js";
import commentRouter from "./routes/comment.routes.js";

// Routes Declaration
app.use("/api/v1/users", userRouter); // http://localhost:4000/api/v1/users
app.use("/api/v1/recipe", recipeRouter); // http://localhost:4000/api/v1/recipe
app.use("/api/v1/comment", commentRouter); // http://localhost:4000/api/v1/comment

export { app };
