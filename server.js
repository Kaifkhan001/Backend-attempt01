import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express'; // **Added to create an instance of Express app**
import bodyParser from 'body-parser'; // **Added to parse incoming request bodies**
import { User } from './models/user.js';
import cors from 'cors'


// **Load environment variables from .env file**
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin: ['https://full-stack-attempt-amny-5pwurnfna-kaifkhan001s-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;



// **Connect to MongoDB Atlas**
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');

    // **Start the Server**
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  });

  app.post('/api/register', async (req, res) => {
    try {
      const { username,email, password, confirmPassword } = req.body;
      console.log("user details : ",username, email, password, confirmPassword)
      const newUser = new User({ username,email, password,confirmPassword });
      await newUser.save();
      res.status(201).send('User registered successfully!' );
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
      console.log("error: ",error);
    }
  });

  app.get('/', (req, res) => {
    res.send("Home Page");
  })
  