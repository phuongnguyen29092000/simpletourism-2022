const express = require('express');

const { ticketController } = require('../controllers')

const router = express.Router()

router.get('/company/:idCompany', ticketController.getAllTicketCompany)

router.get('/:id', ticketController.getTicketById)

router.post('/create/:tourId', ticketController.bookTicket)

router.put('/:id', ticketController.updateTicketById)

router.delete('/:id', ticketController.deleteTicketById)

module.exports = router