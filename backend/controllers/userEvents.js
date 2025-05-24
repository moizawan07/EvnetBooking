const eventModel = require("../models/event");

const allEventGet =  async (req, res) => {
  let {user} = req.params
  try {
     let events = await eventModel.find({ email: user });
      res.status(200).json({message : 'successfully', data : events})
  } 
  catch (error) {
    res.status(400).json({message : 'server error'})
  }

};

module.exports = allEventGet;
