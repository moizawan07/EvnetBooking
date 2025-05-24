const mongoose = require('mongoose')
require('dotenv').config()
let URL = process.env.DB_STRING_URL

console.log(URL);


const dbConnect = async () => {
    
    try {
      await  mongoose.connect(URL)
      console.log('DataBase Connected ✔');
   
   } 
   catch (error) {
      console.log('DatBase not Connected ❌');
      process.exit(1) // App Forcefully Stoped
   }

}

module.exports = dbConnect