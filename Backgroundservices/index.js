const express = require('express');
const cron = require('node-cron');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
//const expenseEmail = require('./helpers/sendEmail');


dotenv.config();

async function expenseEmail() {
  // … query MongoDB for today’s expenses …
  // … format an email …
  // … send via nodemailer, SendGrid, etc. …
  console.log('📧 Sending expense summary at', new Date());
}

// Middleware
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});



const schedule= () => {
cron.schedule('* * * * *', () => {
    expenseEmail();
  
  // Add your task logic here
});
}
schedule();
app.listen(process.env.PORT, () => {
  console.log(`Background services is running on port ${process.env.PORT}`);
});