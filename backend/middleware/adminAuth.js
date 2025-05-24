const adminAuth = (req, res, next) => {
  let { email, password} = req.body

  if(!email || !password){
    return res.status(400).json({message : 'All Fields complasary'})
  }

  next()
  
}

module.exports = adminAuth