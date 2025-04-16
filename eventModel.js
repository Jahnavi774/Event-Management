const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  totalTickets: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
  image: { type: String, required: true },
  organizerId: { type: String, ref: 'Organizer', required: true },
});

module.exports = mongoose.model("Event", eventSchema);
