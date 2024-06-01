const express = require("express");
const UserController = require("../controllers/User");

const router = express.Router();

router.get("/", UserController.findAll);
router.get("/:id", UserController.findOne);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset/:token", UserController.resetPassword);

module.exports = router;
