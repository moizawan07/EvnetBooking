const eventModel = require("../models/event")

const eventStatusChnaged = async (req, res) => {
    let {status} = req.body
    let {id} = req.params

  try {
    let event = await eventModel.findByIdAndUpdate(id, { status });
     res.status(200).json({message : 'sucesssfully updated'})  
  } 
  catch (error) {
     res.status(500).json({message : 'server errror'})  
  }
}

module.exports = eventStatusChnaged