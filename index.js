import express from "express";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import urlRoute from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";
import connectToMongoDB from "./connection.js";
import {handleRedirectToURL} from "./controllers/url.js";
import {restrictToLoggedInUser, checkAuthentication} from "./middlewares/auth.js";

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
app.use(cookieParser());


app.use("/url", restrictToLoggedInUser, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuthentication, staticRouter);

app.get("/url/:shortId", handleRedirectToURL);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))