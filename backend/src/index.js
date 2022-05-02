require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const routes = require("./routes");
const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("combined"));

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ggClient = require("./config/OAuth");

passport.use(
    new GoogleStrategy({
            clientID: ggClient.googleClientId,
            clientSecret: ggClient.googleClientSecret,
            callbackURL: "/auth/google/callback",
        },
        (accessToken) => {
            console.log(accessToken);
        }
    )
);

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

app.get("/auth/google/callback", passport.authenticate("google"));

app.use("/", routes);

app.all("*", (req, res) => {
    res.status(404).json({
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));