const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//////////////////////////////////////////////////////////////
// Retrieving All
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//////////////////////////////////////////////////////////////
// Retrieving One
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

//////////////////////////////////////////////////////////////
// Creating One
router.post("/", async (req, res) => {
  console.log(" ----- Creating One ---- ");
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber); //201 means object created successfully. 200 mean everything ok
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 means user side error, 500 means server side error
  }
});

////////////////////////////////////////////////////////////////
// Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }

  try {
    //await res.subscriber.findByIdAndUpdate(req.params.id, req.body);
    
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/////////////////////////////////////////////////////////////////
// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted Suscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//////////////////////////////////////////////////////////////////
// MW
async function getSubscriber(req, res, next) {
  let subscriber = {};

  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res
        .status(404)
        .json({ message: "Server: Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
