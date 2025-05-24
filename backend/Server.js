const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
// DataBase Function
const dbConnect = require('./config/db')

app.use(express.json()) 
app.use(cors()) 
dotenv.config() 

dbConnect() // Database Connected

// ROUTES Imports
const adminRoutes = require('./routes/adminRoutes')     
const userRoutes = require('./routes/userRoutes');      




// Use routes with prefixes
app.use('/admin',   adminRoutes);
app.use('/user',    userRoutes);



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is Running in ${PORT}`))