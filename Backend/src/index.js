// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import { app } from "./app.js";
import connectMongo from "./db/connectMongo.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT;
connectMongo()
  .then((e) => {
    app.listen(port || 4040, () => {
      console.log(`✅ Server is running at the port ${port || 4040}`);
    });
  })
  .catch((e) => {
    console.log("❌ Mongodb connection failed :", e);
  });

app.get("/", (req, res) => res.send(" ✅API Running..."));
