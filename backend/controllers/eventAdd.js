const eventModel = require("../models/event");

const eventAdd = async (req, res) => {
  let { name, email, eventDescription, date, time } = req.body;

  try {
    let send = await eventModel.create({
      name,
      email,
      description: eventDescription,
      date,
      time,
    });

    res.status(200).json({ message: "Event Add successfully", data: send });
  } catch (error) {
    res.status(500).json({ message: "Server erroe" });
  }
};

module.exports = eventAdd;
