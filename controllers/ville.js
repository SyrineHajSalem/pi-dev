const VilleModel = require("../model/ville");

// Create and Save a new ville
exports.create = async (req, res) => {
  if (
    !req.body.nom &&
    !req.body.nb_point_urban_move 
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const ville = new VilleModel({
    nom: req.body.nom,
    nb_point_urban_move: req.body.nb_point_urban_move,
    gouvernement:req.body.gouvernement,
  });

  await ville
    .save()
    .then((data) => {
      res.send({
        message: "ville created successfully!!",
        ville: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating ville",
      });
    });
};

// Retrieve all ville from the database.
exports.findAll = async (req, res) => {
  try {
    const ville = await VilleModel.find().populate("gouvernement");
    res.status(200).json(ville);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single gouvernement with an id
exports.findOne = async (req, res) => {
  try {
    const ville = await VilleModel.findById(req.params.id);
    res.status(200).json(ville);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a ville by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await VilleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `ville not found.`,
        });
      } else {
        res.send({ message: "ville updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Delete a ville with the specified id in the request
exports.destroy = async (req, res) => {
  await VilleModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `ville not found.`,
        });
      } else {
        res.send({
          message: "ville deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
