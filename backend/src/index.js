require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var paypal = require("paypal-rest-sdk");
var handlebars = require("express-handlebars");
const cookieSession = require("cookie-session");
require("./utils/passport.setup");

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

app.get("/payment", (req, res) => {
  res.render("payment");
});

var items = [
  {
    name: "Book",
    sku: "001",
    price: "1.00",
    currency: "USD",
    quantity: 2,
  },
  {
    name: "Pen",
    sku: "002",
    price: "1.00",
    currency: "USD",
    quantity: 3,
    test: "hihi",
  },
];

var total = 0;
for (let i = 0; i < items.length; i++) {
  total += parseFloat(items[i].price * items[i].quantity);
}
// test paypal
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AT-3wtFY4vRdTG2WwbEfFPtzmUVEDN0AMm_wUGdWbzb-fF6_ru2tIhYdqhrFWecoRmuZQTxUHIoTbEmF",
  client_secret:
    "EAxFI5SE1mUxfYy3xH1w3RdWItSB-lLuiQyTOoLFhBqaahE8wTyZoPY5Wfr7bb0mAKGz6_xzcoQnu9Xl",
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
          items: items,
        },
        amount: {
          currency: "USD",
          total: total.toString(),
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log(payment);
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.send(payment.links[i].href);
        }
      }
    }
  });
});

// app.get("/payment/success", (req, res) => {
//   const payerId = req.query.PayerID;
//   var execute_payment_json = {
//     payer_id: payerId,
//     transactions: [
//       {
//         amount: {
//           currency: "USD",
//           total: total.toString(),
//         },
//       },
//     ],
//   };

//   var paymentId = req.query.paymentId;

//   paypal.payment.execute(
//     paymentId,
//     execute_payment_json,
//     function (error, payment) {
//       if (error) {
//         console.log(error.response);
//         throw error;
//       } else {
//         res.render("payment");
//       }
//     }
//   );
// });

app.use("/", routes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
