require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var paypal = require("paypal-rest-sdk");

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

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const ggClient = require("./config/OAuth");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: ggClient.googleClientId,
//       clientSecret: ggClient.googleClientSecret,
//       callbackURL: "/auth/google/callback",
//     },
//     (accessToken) => {
//       console.log(accessToken);
//     }
//   )
// );

// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// app.get("/auth/google/callback", passport.authenticate("google"));

// test paypal
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AZCqU5NL0w8YjqRd0PxXtQYxjTx2uTtbE-kFbP0zg_Iv_bAtjlz7bf0Q1uX0I_2go1hFBWmmS48o31cl",
  client_secret:
    "EHfxmdV87ysZ5nndsEYSIJxRjjhmhD59MTbwR80XojA6mLKncybHwHUFUKQPqE8J52LghpjKlwu_OYZt",
});

app.post("/pay", (req, res, next) => {
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:4000/payment/success",
      cancel_url: "http://localhost:4000/payment/failure",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.use("/", routes);

app.all("*", (req, res) => {
  res.status(404).json({
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
