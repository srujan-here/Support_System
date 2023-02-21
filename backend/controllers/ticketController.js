const asynHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

//@route GET /api/tickets

const getTickets = asynHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const ticket = await Ticket.find({ user: req.user.id });

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  res.status(200).json(ticket);
});

//@route GET /api/tickets/:id
const getTicket = asynHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authenticated");
  }

  res.status(200).json(ticket);
});

//@route POST /api/tickets

const postTicket = asynHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(404);
    throw new Error("Please add Product and Description");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json({ message: "ticket created" });
});

//Delete ticket
//@route DELETE /api/tickets/:id

const deleteTicket = asynHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authenticated");
  }
  await ticket.remove();

  res.status(200).json({ message: "success true" });
});

//UPDATE Ticket
////@route UPDATE /api/tickets/:id

const updateTicket = asynHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authenticated");
  }
  const upadteticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(upadteticket);
});

module.exports = {
  getTicket,
  getTickets,
  postTicket,
  deleteTicket,
  updateTicket,
};
