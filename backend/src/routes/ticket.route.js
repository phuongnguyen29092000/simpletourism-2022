const express = require('express');

const { ticketController } = require('../controllers')

const router = express.Router()

router.get('/', ticketController.getAllTicket)

router.get('/:id', ticketController.getTicketById)

router.post('/create', ticketController.bookTicket)

router.put('/:id', ticketController.updateTicketById)

router.delete('/:id', ticketController.deleteTicketById)

module.exports = router