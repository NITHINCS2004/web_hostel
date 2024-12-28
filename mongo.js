const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/HostelManagement")
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => {
    console.error('error:', err);
  });

const tutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  block: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1
  },
  branch: {
    type: String,
    required: true
  },
  reg_no: {
    type: String,
    required: true
  }
});

const Users = mongoose.model("users", tutSchema);

const data = [
  /*{
    name: "nithin",
    email: "nithin@example.com",
    block: "A",
    branch: "CSE",
    reg_no: "12345"
  },
  {
    name: "nithish",
    email: "nithish@example.com",
    block: "b",
    branch: "ise",
    reg_no: "12345345"
  },*/
  {
    name: "monu",
    email: "monu@example.com",
    block: "Q",
    branch: "EEE",
    reg_no: "monu@2004"
  }
];

const insertData = async () => {
  try {
    const existingUsers = await Users.find({
      $or: data.map(user => ({ reg_no: user.reg_no }))
    });

    if (existingUsers.length === 0) {
      const docs = await Users.insertMany(data);
      console.log('Data inserted successfully:', docs);
    } else {
      console.log('Data already exists in the database');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

insertData();
