/* eslint-disable */
const catchAsync = require("../utils/catchAsync");
const { PaypalService } = require("../services");

const createPayment = catchAsync(async (req, res) => {
  var price = (req.body.price / 23000).toFixed(2);
  var total = 0;
  var items = [
    {
      name: req.body.name,
      sku: req.body.sku,
      price: price,
      currency: "USD",
      quantity: req.body.quantity,
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
