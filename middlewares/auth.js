import {getUser} from "../service/auth.js";

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) {
        return next();
    }

    const token = tokenCookie;
    req.user = getUser(token);

    return next();
}

function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }

        if (!roles.includes(req.user.role)) {
            return res.end("Unauthorized");
        }

        next();
    };
}

export {checkForAuthentication, restrictTo};