const express = require("express");
const VilleController = require("../controllers/ville");

const router = express.Router();

router.get("/", VilleController.findAll);
router.get("/:id", VilleController.findOne);
router.post("/", VilleController.create);
router.put("/:id", VilleController.update);
router.delete("/:id", VilleController.destroy);

module.exports = router;
