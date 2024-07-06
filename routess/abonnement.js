const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/abonnement");

router.get("/", subscriptionController.getAllSubscriptions);
router.post("/", subscriptionController.createSubscription);
router.get("/:id", subscriptionController.getSubscriptionById);
router.put("/:id", subscriptionController.updateSubscription);
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;
