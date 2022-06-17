const express = require("express");

const { PaymentController } = require("../controllers");

const router = express.Router();

router.route("/create").post(PaymentController.createPayment);
router
  .route("/owner/account/:ticketId")
  .get(PaymentController.getPayPalAccountOfOwner);
router.route("/:idTicket/success").get(PaymentController.getSuccessPayment);
router
  .route("/success/:idTicket")
  .patch(PaymentController.updateTicketStatusWithPaymentSuccess);

module.exports = router;
