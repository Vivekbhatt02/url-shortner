import {v4 as uuidv4} from 'uuid';
import User from "../models/user.js";
import {setUser} from "../service/auth.js";

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/login");
}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});

    if (!user) {
        return res.render("login", {error: "Invalid Username or password"});
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("sessionId", sessionId);
    return res.redirect("/");
}

export {handleUserSignup, handleUserLogin};