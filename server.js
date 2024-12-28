
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 8975; // Permanent port number

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HostelManagement', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define User schema
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    regno: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    block: { type: String, required: true },
    room: { type: Number, required: true } // Adding room field
});

// Create User model
const User = mongoose.model('users', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*app.use(express.static(path.join(__dirname, 'public'))); // Serve static files*/

// Serve the form.html file
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Define a route to handle form submissions
app.post('/register', async (req, res) => {
    const { fullname, regno, email, phone, password, gender, block, room } = req.body;

    try {
        // Check if the room is full
        const roomCount = await User.countDocuments({ block, room });
        if (roomCount >= 2) {
            const roomFullMessage = `
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 18px; color: red;">The selected room ${room} in block ${block} is full. Please choose another room.</p>
                    <a href="/register" class="back-button">Back to Registration</a>
                </div>
            `;
            return res.send(roomFullMessage);
        }

        // Check if the block is full
        const blockCount = await User.countDocuments({ block });
        if (blockCount >= 10) {
            const blockFullMessage = `
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 18px; color: red;">The selected block ${block} is full. Please choose another block.</p>
                    <a href="/register" class="back-button">Back to Registration</a>
                </div>
            `;
            return res.send(blockFullMessage);
        }

        const newUser = new User({
            fullname,
            regno,
            email,
            phone,
            password,
            gender,
            block,
            room // Including room in the user data
        });

        await newUser.save();

        const successMessage = `
            <div style="text-align: center; margin-top: 20px;">
                <p style="font-size: 18px; color: green;">Data inserted successfully!</p>
                <a href="/register" class="back-button">Back to Registration</a>
            </div>
        `;
        res.send(successMessage);
    } catch (err) {
        res.status(400).send('Error inserting data.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
