var express = require("express");
const Reservation = require("../models/reservation");
const Vehicule = require("../models/vehicule");
var router = express.Router();

// GET route to retrieve all reservations
router.get("/reservations", async (req, res, next) => {
  try {
    console.log("GET route to retrieve all reservations");
    const reservations = await Reservation.find();
    console.log("test", reservations);
    res.json(reservations);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

// POST route to add a new reservation
router.post("/addReservations", async (req, res, next) => {
  let newReservation = new Reservation(req.body);
  let vehicle
  try {
   vehicle = await Vehicule.findOne({ available: true }).exec();
   console.log(vehicle)
  }
  catch (error) {
    res.status(400).json({ message: "no available vehicule" });
  }
  if(vehicle){
  try {
    const updatedVehicle = await Vehicule.findByIdAndUpdate(
      vehicle._id,
      { available: false },
      { new: true } // To return the updated document
    );

    if (!updatedVehicle) {
      res.status(400).json({ message: "vehicule not found" });
      throw new Error('vehicule not found');
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating vehicule availability" });
    throw new Error(`Error updating vehicule availability: ${error.message}`);
  }
  try {
    newReservation.paid=false
    newReservation.id_vehicule=vehicle._id
    const dateDebut = new Date(newReservation.dateDebut);
    const dateFin = new Date(newReservation.dateFin);
    console.log("date",dateDebut)
    const diffTime = Math.abs(dateFin.getTime() - dateDebut.getTime());
    console.log("diff ", diffTime);

    let nbrJour = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log("jours ", nbrJour);
    newReservation.tarif=nbrJour*vehicle.prixparjour
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
}
});

// DELETE route to delete a reservation
router.delete("/:reservationId", async (req, res, next) => {
  try {
    const reservationId = req.params.reservationId;
    console.log(typeof reservationId);
    await Reservation.findByIdAndDelete(reservationId);
    res.sendStatus(204);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

// PATCH route to update a reservation
router.patch("/:idReservation", async (req, res) => {
  try {
    const { idReservation } = req.params;
    const reservation = await Reservation.findByIdAndUpdate(
      idReservation,
      req.body,
      {
        new: true,
      }
    );
    res.json(reservation);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

// GET route to retrieve stats
router.get("/stats", async (req, res, next) => {
  try {
    console.log("GET route to retrieve stats");
    const reservations = await Reservation.find();
    console.log("test", reservations);
    const reservationCount = reservations.reduce((acc, reservation) => {
      acc[reservation.id_vehicule] = (acc[reservation.id_vehicule] || 0) + 1;
      return acc;
    }, {});

    const currentDate = new Date();
    console.log("current  date:" + currentDate.getMonth());
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    console.log("month" + oneMonthAgo.getMonth());
    const reservationsLastMonth = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.dateDebut);
      console.log(reservationDate <= currentDate);
      return reservationDate >= oneMonthAgo && reservationDate <= currentDate;
    });

    let mostReservedCarId;
    let maxReservations = 0;

    for (const carId in reservationCount) {
      if (reservationCount.hasOwnProperty(carId)) {
        const reservations = reservationCount[carId];
        if (reservations > maxReservations) {
          maxReservations = reservations;
          mostReservedCarId = carId;
        }
      }
    }

    // Find the least reserved car
    let leastReservedCarId;
    let minReservations = Infinity; // Set initial value to infinity

    for (const carId in reservationCount) {
      if (reservationCount.hasOwnProperty(carId)) {
        const reservations = reservationCount[carId];
        if (reservations < minReservations) {
          minReservations = reservations;
          leastReservedCarId = carId;
        }
      }
    }
    const result = {
      bestcar: mostReservedCarId,
      maxreservation: maxReservations,
      minreservation: minReservations,
      worstcar: leastReservedCarId,
      lastmonthreservation: reservationsLastMonth.length,
    };
    res.json(result);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

// GET route to retrieve stats
router.post("/getRervationStat", async (req, res, next) => {
  try {
    const { id_vehicule, start_date, end_date } = req.body;

    // Convert start_date to a Date object
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Query reservations for the specified vehicle starting from the provided date
    const reservations = await Reservation.find({
      id_vehicule,
      dateDebut: { $gte: startDate, $lte: endDate }, // Retrieve reservations starting from the provided date
    });

    res.json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
