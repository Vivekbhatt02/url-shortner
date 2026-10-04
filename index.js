import express from "express";
import "dotenv/config";
import urlRoute from "./routes/url.js";
import connectToMongoDB from "./connection.js";
import {handleRedirectToURL} from "./controllers/url.js";

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

connectToMongoDB(MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Error Occurred while connection to DB", err));

//middleware
app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", handleRedirectToURL);

app.get("/", (req, res) => {
    res.status(200).json({msg: "Welcome"})
})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))