// import express from "express";
const express = require("express");

const router = express.Router();
const {
  getTickets,
  postTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const noteRoute = require("./noteRoutes");
router.use("/:ticketId/notes", noteRoute);
router.route("/").get(protect, getTickets).post(protect, postTicket);
router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);
module.exports = router;
