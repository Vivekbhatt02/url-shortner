import express from "express";
import "dotenv/config";
import path from "path";
import urlRoute from "./routes/url.js";
import connectToMongoDB from "./connection.js";
import {handleRedirectToURL} from "./controllers/url.js";
import staticRouter from "./routes/staticRouter.js";

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

connectToMongoDB(MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Error Occurred while connection to DB", err));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/url/:shortId", handleRedirectToURL);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))