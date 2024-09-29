const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hhdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
// Define a schema and model
const locationSchema = new mongoose.Schema({
    location: String,
    date: String,
    time: String,
    imageUrl: String
});

const Location = mongoose.model('Location', locationSchema);

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// API endpoint to handle image upload and form data
app.post('/upload', upload.single('image'), async (req, res) => {
    const { location, date, time } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newLocation = new Location({
        location,
        date,
        time,
        imageUrl
    });

    try {
        await newLocation.save();
        res.json({ message: 'Location added successfully', data: newLocation });
    } catch (err) {
        res.status(500).json({ message: 'Error saving location', error: err });
    }
});

// API endpoint to get all locations
app.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching locations', error: err });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});