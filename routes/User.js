const express = require("express");
const UserController = require("../controllers/User");

const router = express.Router();

router.get("/", UserController.findAll);
router.get("/getNumberOfUsers/ByGouvernerat", UserController.getNumberOfUsersByGouvernerat);
router.get("/getNumberOfUsers/ByGenre", UserController.getNumberOfUsersByGenre);
router.get("/getNumberOfUsers/ByAge", UserController.getNumberOfUsersByAge);
router.get("/:id", UserController.findOne);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset/:token", UserController.resetPassword);

module.exports = router;
