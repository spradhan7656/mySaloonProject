require('dotenv').config();
const express =  require('express');
const multer = require('multer');
const app = express();
const connectToDB = require('./database/db');
const authRoute = require('./routes/auth-route');
const homeRoute = require('./routes/home-route');
connectToDB();
const upload = multer();
const PORT=process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',upload.none(),authRoute);
app.use('/api/home',homeRoute);

app.listen(PORT,()=>{
    console.log(`Server in now running in the PORT ${PORT}`);
})