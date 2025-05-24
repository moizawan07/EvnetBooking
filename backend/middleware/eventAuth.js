const eventAuth = (req, res, next) => {
  console.log("res body==>", req.body);
  
  let {name, email, eventDescription} = req.body

  if(!name || !email || !eventDescription){
    return res.status(400).json({message : 'All Fields complasary'})
  }

  next()
}

module.exports = eventAuth