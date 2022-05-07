const { Ticket } = require('../models')

const bookTicket = async(ticketBody) => {
    const ticket = await Ticket.create(ticketBody)
    return ticket
}

const getAllTicket = async(page, perPage) => {
    const tickets = await Ticket.find()
        .skip((perPage * page) - perPage)
        .limit(perPage)

    return tickets
}

const getTicketById = async(id) => {
    const ticket = await Ticket.findById(id)
    return ticket
}

const updateTicketById = async(id, ticketBody) => {
    const ticket = await getTicketById(id)
    Object.assign(ticket, ticketBody);
    await ticket.save();
    return ticket;
}

const deleteTicketById = async(id) => {
    const ticket = await getTicketById(id)
    await ticket.remove()
    return ticket
}

module.exports = {
    bookTicket,
    getAllTicket,
    getTicketById,
    updateTicketById,
    deleteTicketById
}