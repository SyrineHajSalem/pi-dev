const gouvernement = require("../model/gouvernement");
const GouvernementModel = require("../model/gouvernement");

// Create and Save a new gouvernement
exports.create = async (req, res) => {
  if (
    !req.body.nom &&
    !req.body.nombre_ville 
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const gouvernement = new GouvernementModel({
    nom: req.body.nom,
    nombre_ville: req.body.nombre_ville,
    villes:req.body.villes,
  });

  await gouvernement
    .save()
    .then((data) => {
      res.send({
        message: "gouvernement created successfully!!",
        gouvernement: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

// Retrieve all gouvernement from the database.
exports.findAll = async (req, res) => {
  try {
    const gouvernement = await GouvernementModel.find().populate("villes");
    res.status(200).json(gouvernement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single gouvernement with an id
exports.findOne = async (req, res) => {
  try {
    const gouvernement = await GouvernementModel.findById(req.params.id);
    res.status(200).json(gouvernement);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a gouvernement by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await GouvernementModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `gouvernement not found.`,
        });
      } else {
        res.send({ message: "gouvernement updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
  await GouvernementModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `gouvernement not found.`,
        });
      } else {
        res.send({
          message: "gouvernement deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
