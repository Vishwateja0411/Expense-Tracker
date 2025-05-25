const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
// Create a transporter object using SMTP transport
function createTransporter(config){
    const transporter = nodemailer.createTransport(config);
        return transporter;
}

let configuration = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

const sendMail=async (to, subject, text) => {
    const transporter =await createTransporter(configuration);
    await transporter.verify();
    await transporter.sendMail(MessageOption, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
