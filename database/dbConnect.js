const mongoose = require('mongoose');

const dbConnection =function() {

     mongoose.connect(process.env.MONGODB_URI, {
     
     })
     .then(con=>console.log(`Connected to database as ${con.connection.host}`))
     .catch(err=> console.log(err))
}

module.exports = dbConnection;