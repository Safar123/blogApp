const app = require('./app');
const dotenv = require('dotenv');
const dbConnection = require('./database/dbConnect');

dotenv.config({path: './config/config.env'});

app.listen(process.env.PORT, ()=>{
     console.log(`Application running at port ${process.env.PORT} on ${process.env.NODE_ENV} environment`)
})
dbConnection();