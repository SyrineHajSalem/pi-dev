const express = require("express");
const Point_urban_moveController = require("../controllers/point_urban_move");

const router = express.Router();

router.get("/", Point_urban_moveController.findAll);
router.get("/:id", Point_urban_moveController.findOne);
router.post("/", Point_urban_moveController.create);
router.put("/:id", Point_urban_moveController.update);
router.delete("/:id", Point_urban_moveController.destroy);

module.exports = router;
