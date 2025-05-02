// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle contact form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Setup the nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Gmail address from environment variable
        pass: process.env.EMAIL_PASS  // App password from environment variable
    }
  });

  // Email message options
  const mailOptions = {
    from: email, // Sender email
    to: process.env.EMAIL_USER, // Receiver email (your email)
    subject: 'Contact Form Message',
    text: `You have a new message from ${name} (${email}):\n\n${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending email.');
    }
    res.status(200).send('Email sent successfully!');
  });
});

// Server listening on the environment's port or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

