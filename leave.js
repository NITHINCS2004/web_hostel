
/*const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8637;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Applyleave', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model for leave requests
const leaveSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  reg: String,
  date: String,
  start: String,
  end: String,
  reason: String
});

const LeaveRequest = mongoose.model('holidays', leaveSchema);

// Serve static files from the project directory
/*app.use(express.static(path.join(__dirname)));*/

// Endpoint to serve HTML with leave requests table
/*app.get('/', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    const leaveRequestsHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Leave Requests</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
          .form-container {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
          }
          .form-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }
          .form-content input,
          .form-content textarea {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
          .form-content button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          .form-content button:hover {
            background-color: #45a049;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>Leave Requests</h1>
        <table id="leaveRequestsTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registration</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="leaveRequestsBody">
            ${leaveRequests.map(request => `
              <tr>
                <td>${request._id}</td>
                <td>${request.name}</td>
                <td>${request.email}</td>
                <td>${request.phone}</td>
                <td>${request.reg}</td>
                <td>${request.date}</td>
                <td>${request.start}</td>
                <td>${request.end}</td>
                <td>${request.reason}</td>
                <td>
                  <a href="#" onclick="openForm('${request._id}', 'approve')">Approve</a>
                  <a href="#" onclick="openForm('${request._id}', 'reject')">Reject</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Modal and JavaScript for contact form -->
        <div id="myModal" class="form-container">
          <div class="form-content">
            <span class="close" onclick="closeForm()">&times;</span>
            <h2>Contact Us</h2>
            <form id="contactForm">
              <input type="hidden" name="leave_id" id="leave_id">
              <input type="hidden" name="action_type" id="action_type">
              <input type="text" name="name" placeholder="Your Name" required>
              <input type="email" name="email" placeholder="Your Email" required>
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost/project/student/studentdashboard.php" class="back-button">Back to Registration</a>
        </div>
        <script>
          function openForm(id, action) {
            document.getElementById('myModal').style.display = 'flex';
            document.getElementById('leave_id').value = id;
            document.getElementById('action_type').value = action;
          }

          function closeForm() {
            document.getElementById('myModal').style.display = 'none';
          }

          // Submit contact form via fetch API
          document.getElementById('contactForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const response = await fetch('/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id: formData.get('leave_id') })
            });

            if (response.ok) {
              document.getElementById('myModal').style.display = 'none';
              window.location.reload(); // Refresh leave requests table
            } else {
              console.error('Error submitting the form');
            }
          });
        </script>
      </body>
      </html>
    `;
    
    res.send(leaveRequestsHTML);
  } catch (error) {
    console.error('Error retrieving leave requests:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to fetch leave requests as JSON
app.get('/leaverequests', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.json(leaveRequests);
  } catch (error) {
    console.error('Error retrieving leave requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete a leave request
app.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    await LeaveRequest.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting leave request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
*/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fetch = require('node-fetch'); // Add fetch for server-side HTTP requests
const app = express();
const PORT = process.env.PORT || 8967;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Applyleave', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the schema and model for leave requests
const leaveSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  reg: String,
  date: String,
  start: String,
  end: String,
  reason: String
});

const LeaveRequest = mongoose.model('holidays', leaveSchema);

// Endpoint to serve HTML with leave requests table
app.get('/', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    const leaveRequestsHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Leave Requests</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
          .form-container {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
          }
          .form-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          }
          .form-content input,
          .form-content textarea {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
          .form-content button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          .form-content button:hover {
            background-color: #45a049;
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>Leave Requests</h1>
        <table id="leaveRequestsTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registration</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="leaveRequestsBody">
            ${leaveRequests.map(request => `
              <tr>
                <td>${request._id}</td>
                <td>${request.name}</td>
                <td>${request.email}</td>
                <td>${request.phone}</td>
                <td>${request.reg}</td>
                <td>${request.date}</td>
                <td>${request.start}</td>
                <td>${request.end}</td>
                <td>${request.reason}</td>
                <td>
                  <a href="#" onclick="openForm('${request._id}', 'approve')">Approve</a>
                  <a href="#" onclick="openForm('${request._id}', 'reject')">Reject</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Modal and JavaScript for contact form -->
        <div id="myModal" class="form-container">
          <div class="form-content">
            <span class="close" onclick="closeForm()">&times;</span>
            <h2>Contact Us</h2>
            <form id="contactForm">
              <input type="hidden" name="leave_id" id="leave_id">
              <input type="hidden" name="action_type" id="action_type">
              <input type="text" name="name" placeholder="Your Name" required>
              <input type="email" name="email" placeholder="Your Email" required>
              <textarea name="message" placeholder="Your Message" required></textarea>
              <input type="hidden" name="access_key" value="cd05da48-d471-4b54-9fc2-3a145ac3a40e">
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="http://localhost/project/admin/studentdetails.html" class="back-button">Back to Registration</a>
        </div>
         <!--<div class="back-button" style="text-align: center; margin-top: 20px;">
            <a href="#" onclick="history.back()"
               style="display: inline-block; padding: 15px 15px; background-color: gray; color: white; text-decoration: none; border-radius: 8px; font-size: 18px; transition: background-color 0.3s ease;">
                Back
            </a>
        </div>-->
        <script>
          function openForm(id, action) {
            document.getElementById('myModal').style.display = 'flex';
            document.getElementById('leave_id').value = id;
            document.getElementById('action_type').value = action;
          }

          function closeForm() {
            document.getElementById('myModal').style.display = 'none';
          }

          // Submit contact form via fetch API
          document.getElementById('contactForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const response = await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              body: formData
            });

            if (response.ok) {
              const deleteResponse = await fetch('/delete', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: formData.get('leave_id') })
              });

              if (deleteResponse.ok) {
                document.getElementById('myModal').style.display = 'none';
                window.location.reload(); // Refresh leave requests table
              } else {
                console.error('Error deleting leave request');
              }
            } else {
              console.error('Error submitting the form to Web3Forms');
            }
          });
        </script>
      </body>
      </html>
    `;
    
    res.send(leaveRequestsHTML);
  } catch (error) {
    console.error('Error retrieving leave requests:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to fetch leave requests as JSON
app.get('/leaverequests', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.json(leaveRequests);
  } catch (error) {
    console.error('Error retrieving leave requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete a leave request
app.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    await LeaveRequest.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting leave request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
