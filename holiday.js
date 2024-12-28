
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 7564;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Applyleave', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    reg: { type: String, required: true },
   date: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    reason: { type: String, required: true }
});

// Create User model
const User = mongoose.model('holidays', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle form submissions and redirect
app.post('/registers', (req, res) => {
    const { name, email, phone, reg,date,  start, end, reason } = req.body;

    const newUser = new User({
        name,
        email,
        phone,
        reg,
        date,
        start,
        end,
        reason
    });

    newUser.save()
        .then(user => {
            // Prepare success message with back button
            const successMessage = `
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 18px; color: green;">Data inserted successfully!</p>
                    <a href="http://localhost/project/student/studentdashboard.php" class="back-button">Back to Registration</a>
                </div>
            `;
            res.send(successMessage);
        })
        .catch(err => {
            // Handle error if data insertion fails
            res.status(400).send('Error inserting data.');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
