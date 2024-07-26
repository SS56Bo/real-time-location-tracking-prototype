const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Location = require('./locationModel');

const app = express();
const port = process.env.PORT || 3000;

let storeArray = [];

const uri =
  'mongodb+srv://Krishanu:2792MongoDB!@Cluster0.ulbjxqh.mongodb.net/geoJsonTest?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Define a route to get coordinates
    app.get('/coordinates', async (req, res) => {
      try {
        const locations = await Location.find({}, 'coordinates -_id').exec();
        const coordinatesArray = locations.map(
          (location) => location.coordinates
        );
        storeArray = coordinatesArray; // Update storeArray with coordinates
        //console.log(storeArray[0]);
        res.json(storeArray);
      } catch (error) {
        res.status(500).send('Error retrieving coordinates');
      }
    });

    // Start the server after successful connection to MongoDB
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });
