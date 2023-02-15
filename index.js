const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config()
const User = require('./models/User.js')
const cors = require('cors');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);


app.use(express.json());    // Enable JSON body parsing
app.use(cors(
  credentials = true,
  origin = 'http://127.0.0.1:5173'
));    // Enable CORS

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);

console.log(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    console.log('test');
    res.json({message: 'test'})
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
  
    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
});



app.listen(4000, '0.0.0.0' , () => {
    console.log('Server started on port 4000');
});