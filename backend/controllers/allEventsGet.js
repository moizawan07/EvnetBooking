const eventModel = require("../models/event");


const allEventGet = async (req, res) => {
  try {
    let allevents = await eventModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ message: "successfully", data: allevents });
  } 
  catch (error) {
    res.status(500).json({message : 'server error'})
  }
};

module.exports = allEventGet;
