const { Ticket, Tour } = require('../models')

const bookTicket = async(ticketBody) => {
    const ticket = await Ticket.create(ticketBody)
    return ticket
}

const getAllTicket = async(idCompany) => {
    let ticketsPerCompany = []
    const tours = await Tour.find()
    const arrayId = tours.filter((tour) => tour.owner.toString() == idCompany.toString()).map((tour) => tour._id.toString());
    // const arrayId = tourPerCompany.map((tour) => tour._id.toString())
    const tickets = await Ticket.find()
    tickets.forEach((ticket) => {
        if (arrayId.includes(ticket.tour.toString()))
            ticketsPerCompany.push(ticket)
    })
    return ticketsPerCompany
}

const getTicketPerTour = async(idTour) => {
    let ticketPerTour = []
    const tickets = await Ticket.find().populate({ path: 'tour' })
    tickets.forEach(ticket => {
        if (ticket.tour._id == idTour) {
            ticketPerTour.push({
                id: ticket._id,
                cusomterId: ticket.customer,
                ownerId: ticket.owner,
                phone: ticket.phone,
                tourName: ticket.tour.tourName,
                totalPrice: parseInt(ticket.paymentPrice * ticket.numberPeople),
                numberPeople: ticket.numberPeople,
                status: ticket.status,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt
            })
        }
    });
    return ticketPerTour
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
    deleteTicketById,
    getTicketPerTour
}