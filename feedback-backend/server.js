require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/feedback', async (req, res) => {
  const { name, email, message, q1Answer, q2Answer } = req.body; // Extract q1Answer and q2Answer

  if (!message) {
    return res.status(400).json({ error: 'Feedback message is required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'katygradecalc@gmail.com', // Recipient email
      subject: 'New Feedback Received',
      text: `
        Name: ${name || 'Anonymous'}
        General feedback: ${message}
        Difficulty to use: ${q1Answer || 'Not provided'}
        How to improve: ${q2Answer || 'Not provided'}
        Timestamp: ${new Date().toISOString()}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send feedback email.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});