const express = require("express");

const { ticketController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/company/:idCompany",
  auth("owner"),
  ticketController.getAllTicketCompany
);

router.get('/history/:id', auth('customer'), ticketController.getTicketsHistory)

router.get("/:id", auth("owner", "customer"), ticketController.getTicketById);

router.post("/create/:tourId", ticketController.bookTicket);

router.put("/:id", auth("owner"), ticketController.updateTicketById);

router.delete(
  "/:id",
  auth("owner", "customer"),
  ticketController.deleteTicketById
);

module.exports = router;
