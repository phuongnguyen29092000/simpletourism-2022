const { PaypalClient } = require("../models");
var paypal = require("paypal-rest-sdk");


var totalPayment = 0;
const createPayment = async (req, res, items, total) => {
  totalPayment = total;
  var client_id = (await PaypalClient.findOne({ owner: { $eq: items[0].sku } }))
    .client_id;
  var client_secret = (
    await PaypalClient.findOne({
      owner: { $eq: items[0].sku },
    })
  ).client_secret;
  paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id: client_id,
    client_secret: client_secret,
  });

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
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.send(payment.links[i].href);
        }
      }
    }
  });
};

const getSuccessPayment = async (payerId, paymentId, req, res) => {
  var execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalPayment.toString(),
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        res.render("payment");
      }
    }
  );
};
module.exports = {
  createPayment,
  getSuccessPayment,
};
