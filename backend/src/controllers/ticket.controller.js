const httpStatus = require("http-status");
const validator = require("validator");
const catchAsync = require("../utils/catchAsync");
const { ticketService, userService, TourService } = require("../services");
const { emailBookTicket } = require("../config/emailTemplates");
const { ticketSchema} = require('../validations')

const bookTicket = catchAsync(async (req, res) => {
  const tour = req.params.tourId;
  const tourDetail = await TourService.getTour(tour);
  let { price, discount } = tourDetail.tour;
  let paymentPrice = 0;
  if (!discount) paymentPrice = price;
  else paymentPrice = Math.ceil(price * (1 - discount));
  const ticketBody = { ...req.body, tour, paymentPrice };

  const validation = await ticketSchema.validate(ticketBody)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).json({
            message: errorMessage
        })
  }

  const ticketInfo = await ticketService.bookTicket(ticketBody);
  if (!ticketInfo)
    res.status(httpStatus.BAD_REQUEST).json({
      status: 400,
      message: "Đặt vé không thành công!",
    });

  res.status(httpStatus.CREATED).json({
    status: 201,
    message: "Đặt vé thành công!",
    ticket: ticketInfo,
  });
});

const getAllTicketCompany = catchAsync(async (req, res) => {
  const tickets = await ticketService.getAllTicket(req.params.idCompany);

  if (tickets.length == 0)
    res.status(httpStatus.NOT_FOUND).json({
      status: 404,
      message: "Không tìm thấy vé",
    });

   else res.status(httpStatus.OK).json({
    status: 200,
    message: "OK",
    tickets: tickets,
  });
});

const getTicketsHistory = catchAsync(async (req, res) => {
  const tickets = await ticketService.getTicketsHistory(req.params.id);

  if (tickets.length == 0)
    res.status(httpStatus.NOT_FOUND).json({
      status: 404,
      message: "Không tìm thấy vé",
    });
  else res.status(httpStatus.OK).json({
    status: 200,
    message: "OK",
    tickets: tickets,
  });
});

const getTicketById = catchAsync(async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.id);

  if (!ticket)
    res.status(httpStatus.NOT_FOUND).json({
      status: 404,
      message: "Không tìm thấy vé",
    });
  else
    res.status(httpStatus.OK).json({
      status: 200,
      message: "OK",
      ticket: ticket,
    });
});

const getTicketPerTour = catchAsync(async (req, res) => {
  const tickets = await ticketService.getTicketPerTour(req.params.idTour);

  if (tickets.length == 0)
    res.status(httpStatus.NOT_FOUND).json({
      status: 404,
      message: "Không tìm thấy vé",
    });
  else res.status(httpStatus.OK).json({
    status: 200,
    message: "OK",
    tickets: tickets,
  });
});

const updateTicketById = catchAsync(async (req, res) => {
  const ticket = await ticketService.updateTicketById(req.params.id, req.body);

  if (!ticket)
    res.status(httpStatus.BAD_REQUEST).json({
      status: 400,
      message: "Cập nhật vé không thành công!",
    });

  else res.status(httpStatus.OK).json({
    status: 200,
    message: "OK",
    ticket: ticket,
  });
});

const deleteTicketById = catchAsync(async (req, res) => {
  await ticketService.deleteTicketById(req.params.id);
  res.status(httpStatus.NO_CONTENT).json({
    status: 204,
    message: "Xóa vé thành công!",
  });
});

const autoDeleteTicketUnpaid = catchAsync(async(req, res) =>{
  const rs = await ticketService.autoDeleteTicketsUnpaid(req.params.id)
  res.status(200).json({ rs : rs})
})


const completeTour = catchAsync(async(req, res) =>{
  const rs = await ticketService.setVisitedTicketPerTourFinish(req.params.id)
  console.log(rs);
  res.status(200).json({ rs : rs})
})

module.exports = {
  bookTicket,
  getAllTicketCompany,
  getTicketById,
  updateTicketById,
  deleteTicketById,
  getTicketPerTour,
  getTicketsHistory,
  autoDeleteTicketUnpaid,
  completeTour,
};
