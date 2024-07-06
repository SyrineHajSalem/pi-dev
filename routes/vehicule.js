var express = require("express");
const Vehicule = require("../models/vehicule");
var router = express.Router();

// GET route to retrieve all vehicule
router.get("/vehicules", async (req, res, next) => {
  try {
    console.log("GET route to retrieve all vehicules");
    const vehicules = await Vehicule.find();
    console.log("test", vehicules);
    res.json(vehicules);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

// POST route to add a new vehicule
router.post("/addVehicule", async (req, res, next) => {
  const { id_vehicule, marque, modele, etats,prixparjour,type } = req.body;

  const newVehicule = new Vehicule({
    id_vehicule,
    marque,
    modele,
    etats,
    available:'true',
    prixparjour,
    type
  });

  try {
    const savedVehicule = await newVehicule.save();
    res.status(201).json(savedVehicule);
  } catch (error) {
    res.status(400).json({ message: error.message, error });
  }
});

// DELETE route to delete a vehicule
router.delete("/:vehiculeId", async (req, res, next) => {
  try {
    const vehiculeId = req.params.vehiculeId;
    await Vehicule.findByIdAndDelete(vehiculeId);
    res.sendStatus(204);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

// PATCH route to update a vehicule
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vehicule = await Vehicule.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(vehicule);
  } catch (error) {
    res.json({ message: error.message, error });
  }
});

module.exports = router;
