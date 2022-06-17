const { PaypalClient, Tour, Ticket } = require("../models");
const { updateTicketById } = require("./ticket.service");
var paypal = require("paypal-rest-sdk");

var totalPayment = 0;
const createPayment = async (req, res, items, total, idTicket) => {
  const idTour = (await Ticket.findById(idTicket)).tour;
  totalPayment = total;
  const ownerId = (await Tour.findById(idTour)).owner;
  var client_id = (await PaypalClient.findOne({ owner: { $eq: ownerId } }))
    .client_id;
  var client_secret = (
    await PaypalClient.findOne({
      owner: { $eq: ownerId },
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
      return_url: `http://localhost:4000/payment/${idTicket}/success`,
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
    async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        //res.render("payment");
        let ticketBody = {
          status: 1,
        };
        let idTicket = req.originalUrl.slice(9, 33);
        await Ticket.findByIdAndUpdate(idTicket, ticketBody);
        res.json({
          status: 200,
          message: "Thanh toán thành công!",
        });
      }
    }
  );
};

const getPayPalAccountOfOwner = async (idTicket) => {
  const idTour = (await Ticket.findById(idTicket)).tour;
  const idOwner = (await Tour.findById(idTour)).owner;
  var client_id = (await PaypalClient.findOne({ owner: { $eq: idOwner } }))
    .client_id;
  var client_secret = (
    await PaypalClient.findOne({
      owner: { $eq: idOwner },
    })
  ).client_secret;
  return {
    client_id,
    client_secret,
  };
};

const updateTicketStatusWithPaymentSuccess = async (idTicket) => {
  let ticketBody = {
    status: 1,
  };
  updatedTicket = await Ticket.findByIdAndUpdate(idTicket, ticketBody, {
    new: true,
  });
  return updatedTicket;
};
module.exports = {
  createPayment,
  getSuccessPayment,
  getPayPalAccountOfOwner,
  updateTicketStatusWithPaymentSuccess,
};
