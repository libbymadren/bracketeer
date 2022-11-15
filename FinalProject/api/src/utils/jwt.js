const jwt = require('jsonwebtoken');

const API_SECRET_KEY = process.env.API_SECRET_KEY;
const TOKEN_COOKIE_NAME = "BRACKETEER_TOKEN";

module.exports["middleware"] = function(req, res, next) {

    // look for the token in the cookie
    let token = null;
    if (!("cookies" in req) || !req.cookies[TOKEN_COOKIE_NAME]) {
        // If the cookie doesn't exist, check for a header
        const authHeader = req.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer "))
            token = authHeader.split(" ")[1];


    } else {
        // If the cookie did exist then get the token value
        token = req.cookies[TOKEN_COOKIE_NAME]
    }


    // check to see if the token was found
    if (!token) {
        console.log("Token didn't exist");
        req.valid_jwt = false;
        next();
        return;
    }

    console.log("found a token!");
    console.log(token);

    // validate token
    try {
        const decoded = jwt.verify(token, API_SECRET_KEY)

        console.log("decoded token:");
        console.log(decoded);

        // set the request variables
        req.jwt_payload = decoded;
        req.valid_jwt = true;

        next();

    } catch(err) {
        console.log(err);
        console.log("Token wasn't valid.");
        req.valid_jwt = false;
        next();
    }
}

module.exports["generateToken"] = function(req, res, payload) {
    console.log("Generating token with payload: ");
    console.log(payload);
    let token = jwt.sign(payload, API_SECRET_KEY, {
        "algorithm": "HS256"
    });

    // Send the jwt back as a cookie
    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 60 * 1000
    });
}


module.exports["removeToken"] = function(req, res) {
    //send session ID in cookie to client
    res.cookie(TOKEN_COOKIE_NAME, "", {
        httpOnly: true,
        secure: true,
        maxAge: -360000 //A date in the past
    });
}