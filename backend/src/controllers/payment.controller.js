var paypal = require("paypal-rest-sdk");
const catchAsync = require("../utils/catchAsync");
const { PaypalService } = require("../services");

const createPayment = catchAsync(async (req, res) => {
  var total = 0;
  var items = [
    {
      name: "Book",
      sku: "626e9241625050b41b5c7783",
      price: "1.00",
      currency: "USD",
      quantity: 2,
    },
  ];
  for (let i = 0; i < items.length; i++) {
    total += parseFloat(items[i].price * items[i].quantity);
  }
  await PaypalService.createPayment(req, res, items, total);
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
