const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema(
  {
    id_reservation: String,
    id_vehicule: String,
    id_client: String,
    dateDebut: Date,
    dateFin: Date,
    tarif: Number,
    paid:Boolean
  },
  {
    timestamps: true,
  }
);
const reservation = mongoose.model("reservation", reservationSchema);
module.exports = reservation;
