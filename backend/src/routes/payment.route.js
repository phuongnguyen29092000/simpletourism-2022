const express = require("express");

const { PaymentController } = require("../controllers");

const router = express.Router();

router.route("/create").post(PaymentController.createPayment);
router.route("/:idTicket/success").get(PaymentController.getSuccessPayment);

module.exports = router;
