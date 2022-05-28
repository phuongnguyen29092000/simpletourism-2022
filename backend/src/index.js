require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var handlebars = require("express-handlebars");
const cookieSession = require("cookie-session");
// require("./utils/passport.setup");

const ApiError = require("./utils/ApiError");
const globalErrorHandler = require("./controllers/error.controller");

const routes = require("./routes");
const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT || 4000;

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

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
app.use(
  cookieSession({ name: "session", keys: ["simple", "tourist"], maxAge: 10 })
);

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
