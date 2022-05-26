var paypal = require("paypal-rest-sdk");
const catchAsync = require("../utils/catchAsync");
const { PaypalService } = require("../services");

const createPayment = catchAsync(async (req, res) => {
  const create_payment_json = await PaypalService.createPayment();
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
});

const getSuccessPayment = catchAsync(async (req, res) => {
  await PaypalService.getSuccessPayment(
    req.query.PayerID,
    req.query.paymentId,
    req,
    res
  );
});
module.exports = {
  createPayment,
  getSuccessPayment,
};
