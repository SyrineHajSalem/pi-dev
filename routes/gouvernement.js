const express = require("express");
const GouvernementController = require("../controllers/gouvernement");

const router = express.Router();

router.get("/", GouvernementController.findAll);
router.get("/:id", GouvernementController.findOne);
router.post("/", GouvernementController.create);
router.put("/:id", GouvernementController.update);
router.delete("/:id", GouvernementController.destroy);

module.exports = router;
