/* eslint-disable */
const catchAsync = require("../utils/catchAsync");
const { PaypalService, ticketService} = require("../services");
const { emailBookTicket } = require("../config/emailTemplates");

const createPayment = catchAsync(async (req, res) => {
  var price = (req.body.price / 23000).toFixed(2);
  var idTicket = req.body.sku;
  var total = 0;
  var items = [
    {
      name: req.body.name,
      sku: idTicket,
      price: price,
      currency: "USD",
      quantity: req.body.quantity,
    },
  ];
  for (let i = 0; i < items.length; i++) {
    total += parseFloat(items[i].price * items[i].quantity);
  }
  await PaypalService.createPayment(req, res, items, total, idTicket);
});

const getSuccessPayment = catchAsync(async (req, res) => {
  await PaypalService.getSuccessPayment(
    req.query.PayerID,
    req.query.paymentId,
    req,
    res
  );
});

const getPayPalAccountOfOwner = catchAsync(async (req, res, next) => {
  const { client_id, client_secret } =
    await PaypalService.getPayPalAccountOfOwner(req.params.ticketId);
  if (!client_id || !client_secret) {
    return next(
      new ApiError(
        `Không thể tìm thấy account với id:  ${req.params.ownerId}!`,
        404
      )
    );
  } else {
    res.status(200).json({
      client_id,
      client_secret,
    });
  }
});

const updateTicketStatusWithPaymentSuccess = catchAsync(
  async (req, res, next) => {
    const updatedTicket =
      await PaypalService.updateTicketStatusWithPaymentSuccess(
        req.params.idTicket
      );
      if (!updatedTicket)
      return next(
        new ApiError(`Không thể cập nhật trạng thái vé, hãy kiểm tra lại!`, 404)
        );
        else {
          const infoTicket = await ticketService.getTicketById(updatedTicket._id.toString());
          if (infoTicket) await emailBookTicket(infoTicket);
          res.status(200).json({
            message: "Cập nhật trạng thái vé thành công!",
            updatedTicket,
          });
    }
  }
);
module.exports = {
  createPayment,
  getSuccessPayment,
  getPayPalAccountOfOwner,
  updateTicketStatusWithPaymentSuccess,
};
