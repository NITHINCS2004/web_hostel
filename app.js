
const express = require('express');
const mongoose = require('mongoose');

// Step 1: Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HostelManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Step 2: Define Mongoose schema
const userSchema = new mongoose.Schema({
    fullname: String,
    regno: String,
    email: String,
    phone: String,
    gender: String,
    block: String,
    room:String
});

// Define the model based on the schema
const User = mongoose.model('User', userSchema, 'users');

// Step 3: Set up Express application
const app = express();
const port = 7945; // Specify the port you want to use

// Step 4: Middleware for JSON parsing
app.use(express.json()); // Middleware to parse JSON bodies

// Step 5: Endpoint to fetch user data for each block
app.get('/', async (req, res) => {
    try {
        // Fetch all distinct blocks from MongoDB
        const distinctBlocks = await User.distinct('block');

        // Initialize an object to store users for each block
        const usersByBlock = {};

        // Fetch users for each block and store in usersByBlock object
        for (const block of distinctBlocks) {
            const users = await User.find({ block });
            usersByBlock[block] = users;
        }

        // Generate HTML for each block
        let tablesHTML = '';
        for (const block in usersByBlock) {
            tablesHTML += `
                <h2>Block ${block}</h2> <!-- Display block name above the table -->
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registration Number</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>RoomNo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usersByBlock[block].map(user => `
                            <tr>
                                <td>${user.fullname}</td>
                                <td>${user.email}</td>
                                <td>${user.regno}</td>
                                <td>${user.phone}</td>
                                <td>${user.gender}</td>
                                <td>${user.room}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        // HTML template with back button
        const htmlTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>User Data by Block</title>
                <style>
                    /* Basic CSS Reset */
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    /* Centering content */
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f0f0f0;
                        flex-direction: column;
                    }

                    /* Table styling */
                    table {
                        width: 80%;
                        border-collapse: collapse;
                        margin-top: 1px;
                    }

                    th, td {
                        padding: 5px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }

                    th {
                        background-color: #f2f2f2;
                    }

                    /* Back button */
                    .back-button {
                        margin-top: 20px;
                        padding: 10px 20px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        cursor: pointer;
                        border-radius: 4px;
                        text-decoration: none;
                    }

                    .back-button:hover {
                        background-color: #45a049;
                    }
                </style>
            </head>
            <body>
                <h1>User Data by Block</h1>
                ${tablesHTML}
                <a href="http://localhost/project/student/studentdashboard.php" class="back-button">Back to Dashboard</a>
            </body>
            </html>
        `;

        // Send the complete HTML response
        res.send(htmlTemplate);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
    }
});

// Step 6: Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
