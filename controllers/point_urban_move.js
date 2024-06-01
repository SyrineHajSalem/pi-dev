const Point_urban_moveModel = require("../model/point_urban_move");

// Create and Save a new point
exports.create = async (req, res) => {
  if (
    !req.body.nom &&
    !req.body.adresse 
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
  }

  const point_urban_move = new Point_urban_moveModel({
    nom: req.body.nom,
    adresse: req.body.nb_point_urban_move,
    ville:req.body.ville,
  });

  await point_urban_move
    .save()
    .then((data) => {
      res.send({
        message: "point_urban_move created successfully!!",
        point_urban_move: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating ville",
      });
    });
};

// Retrieve all point_urban_move from the database.
exports.findAll = async (req, res) => {
  try {
    const point_urban_move = await Point_urban_moveModel.find().populate("ville");
    res.status(200).json(point_urban_move);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single point_urban_move with an id
exports.findOne = async (req, res) => {
  try {
    const point_urban_move = await Point_urban_moveModel.findById(req.params.id);
    res.status(200).json(point_urban_move);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a point_urban_move by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  await Point_urban_moveModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `point_urban_move not found.`,
        });
      } else {
        res.send({ message: "point_urban_move updated successfully." });
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
  await Point_urban_moveModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `point_urban_move not found.`,
        });
      } else {
        res.send({
          message: "point_urban_move deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
