const Subscription = require("../model/abonnement");

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subscription
exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
