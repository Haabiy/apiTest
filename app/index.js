import express from "express";
import bodyParser from "body-parser";
import axios from 'axios';
import { jokes } from './jokes.js';

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));

// Get a random joke using /random end point
app.get('/random', (req, res) => {
  try {
    // Generate a random index within the bounds of the jokes array
    const randomIndex = Math.floor(Math.random() * jokes.length);

    // Retrieve the joke at the random index
    const randomJoke = jokes[randomIndex];

    // Send the random joke as the response
    res.json(randomJoke);

    // Log the random joke to the console
    console.log(randomJoke);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// To filter by id
app.get('/jokes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const joke = jokes.find(j => j.id === parseInt(id));

    if (!joke) {
      return res.status(404).json({ message: 'Joke not found' });
    }

    return res.status(200).json(joke);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Add your own jokes
app.post('/jokes', (req, res) => {
  try {
    // Extract the joke text and type from the request body
    const { jokeText, jokeType } = req.body;

    // Check if both jokeText and jokeType are provided
    if (!jokeText || !jokeType) {
      return res.status(400).json({ message: 'Both jokeText and jokeType are required.' });
    }

    // Create a new joke object
    const newJoke = {
      id: jokes.length + 1, // Generate a unique ID (assuming IDs are sequential integers)
      jokeText,
      jokeType
    };

    // Add the new joke to the jokes array
    jokes.push(newJoke);

    // Send the new joke as the response
    res.status(201).json(newJoke);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT to update a joke by ID; 
// Testing in postman ? -> http://localhost:3000/jokes/98
app.put('/jokes/:id', (req, res) => {
  try {
    // Extract the joke ID from the request parameters
    const jokeId = parseInt(req.params.id);

    // Find the index of the joke with the given ID in the jokes array
    const jokeIndex = jokes.findIndex(joke => joke.id === jokeId);

    // Check if the joke with the given ID exists
    if (jokeIndex === -1) {
      return res.status(404).json({ message: 'Joke not found.' });
    }

    // Extract the updated joke text and type from the request body
    const { jokeText, jokeType } = req.body;

    // Check if both jokeText and jokeType are provided
    if (!jokeText || !jokeType) {
      return res.status(400).json({ message: 'Both jokeText and jokeType are required.' });
    }

    // Update the joke with the given ID
    jokes[jokeIndex] = {
      ...jokes[jokeIndex], // Keep other properties unchanged
      jokeText,
      jokeType
    };

    // Send the updated joke as the response
    res.json(jokes[jokeIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH endpoint to update a joke
app.patch('/jokes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const jokeToUpdate = jokes.find(joke => joke.id === parseInt(id));

    if (!jokeToUpdate) {
      return res.status(404).json({ message: 'Joke not found' });
    }

    const { jokeText, jokeType } = req.body;

    if (jokeText) {
      jokeToUpdate.jokeText = jokeText;
    }

    if (jokeType) {
      jokeToUpdate.jokeType = jokeType;
    }

    return res.status(200).json({ message: 'Joke updated successfully', updatedJoke: jokeToUpdate });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// DELETE a joke by ID
app.delete('/jokes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id); // Extract the joke ID from the request parameters
    const { key } = req.body; // Extract the key from the request body
    // Check if the provided key matches the master key
    if (key !== masterKey) {
      return res.status(403).json({ message: 'Unauthorized. Master key is required for this operation.' });
    }

    const index = jokes.findIndex(joke => joke.id === id); // Find the index of the joke with the given ID

    // If the joke is found, remove it from the jokes array
    if (index !== -1) {
      jokes.splice(index, 1);
      res.status(200).json({ message: `Joke with ID ${id} deleted successfully` });
    } else {
      // If the joke with the given ID is not found, return a 404 Not Found status
      res.status(404).json({ message: `Joke with ID ${id} not found` });
    }
  } catch (error) {
    // If any error occurs, return a 500 Internal Server Error status
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Listening on port 3000
app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});