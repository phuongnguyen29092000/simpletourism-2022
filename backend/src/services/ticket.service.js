const { Ticket, Tour } = require('../models')
const mongoose = require("mongoose");

const bookTicket = async(ticketBody) => {
    const ticket = await Ticket.create(ticketBody)
    return ticket
}

const getAllTicket = async(idCompany) => {
    let ticketsPerCompany = []
    const tours = await Tour.find()
    const arrayId = tours.filter((tour) => tour.owner.toString() == idCompany.toString()).map((tour) => tour._id.toString());
    const tickets = await Ticket.aggregate(
        [
            {
                $lookup: {
                        from: "users",
                        localField: "customer",
                        foreignField: "_id",
                        as: "customer"
                }
            },
            {
                $lookup: {
                    from: "tours",
                    localField: "tour",
                    foreignField: "_id",
                    as: "tour"
                }
            },
            { $unwind: '$tour' },
            { $unwind: '$customer' },
            {
                "$addFields": {
                    "idTour": "$tour._id",
                    "customerId": "$customer._id",
                    "customerName": "$customer.givenName",
                    "tourName": "$tour.tourName",
                    "email": '$customer.email'
                }
            },
            { $project: {
                _id: 1,
                idTour: 1,
                customerId: 1,
                customerName: 1,
                tourName:1,
                phone: 1,
                email: 1,
                numberPeople:1,
                paymentPrice: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1
            }}
        ]
    )

    tickets.forEach((ticket) => {
        if (arrayId.includes(ticket.idTour.toString()))
            ticketsPerCompany.push(ticket)
    })
    return ticketsPerCompany
}

const getTicketPerTour = async(id) => {
    const ticketPerTour = await Ticket.aggregate(
        [
            {
                $lookup: {
                        from: "users",
                        localField: "customer",
                        foreignField: "_id",
                        as: "customer"
                }
            },
            {
                $lookup: {
                    from: "tours",
                    localField: "tour",
                    foreignField: "_id",
                    as: "tour"
                }
            },
            { $unwind: '$tour' },
            { $unwind: '$customer' },
            {
                "$addFields": {
                    "idTour": "$tour._id",
                    "customerId": "$customer._id",
                    "customerName": "$customer.givenName",
                    "tourName": "$tour.tourName",
                    "email": '$customer.email'
                }
            },
            { $match: { idTour: new mongoose.Types.ObjectId(id) } },
            { $project: {
                _id: 1,
                idTour: 1,
                customerId: 1,
                customerName: 1,
                tourName:1,
                phone: 1,
                email: 1,
                numberPeople:1,
                paymentPrice: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1
            }}
        ]
    )
    return ticketPerTour
}

const getTicketsHistory = async(id) =>{
    const ticketsHistory = await Ticket.aggregate(
        [
            {
                $lookup: {
                        from: "users",
                        localField: "customer",
                        foreignField: "_id",
                        as: "customer"
                }
            },
            {
                $lookup: {
                    from: "tours",
                    localField: "tour",
                    foreignField: "_id",
                    as: "tour"
                }
            },
            { $unwind: '$tour' },
            { $unwind: '$customer' },
            {
                "$addFields": {
                    "idTour": "$tour._id",
                    "customerId": "$customer._id",
                    "customerName": "$customer.givenName",
                    "tourName": "$tour.tourName",
                    "email": '$customer.email'
                }
            },
            { 
                $match: { 
                    customerId: new mongoose.Types.ObjectId(id),
                    status: 1
                } 
            },
            { $project: {
                _id: 1,
                idTour: 1,
                customerId: 1,
                customerName: 1,
                tourName:1,
                phone: 1,
                email: 1,
                numberPeople:1,
                paymentPrice: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1
            }}
        ]
    )
    return ticketsHistory
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
    getTicketPerTour,
    getTicketsHistory
}