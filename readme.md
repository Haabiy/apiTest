## Jokes API Routes

### GET /random

- **Description:** Retrieves a random joke from the collection.
- **Response:** Returns a JSON object representing a random joke.
- **Example:** 
  ```
  GET /random
  Response:
  {
    "id": 1,
    "jokeText": "Why don't scientists trust atoms? Because they make up everything.",
    "jokeType": "Science"
  }

### POST /jokes

- **Description:** Adds a new joke to the collection.
- **Request Body:** JSON object containing the new joke's text and type.
- **Example:** 
  ```
  POST /jokes
  Request Body:
  {
    "jokeText": "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "jokeType": "Puns"
  }
  ```
- **Response:** Returns the newly added joke as a JSON object.

### PUT /jokes/:id

- **Description:** Updates an existing joke with the specified ID.
- **Request Parameters:** `:id` - The ID of the joke to be updated.
- **Request Body:** JSON object containing the updated joke's text and type.
- **Example:** 
  ```
  PUT /jokes/1
  Request Body:
  {
    "jokeText": "Updated joke text",
    "jokeType": "Updated joke type"
  }
  ```
- **Response:** Returns the updated joke as a JSON object.

### PATCH /jokes/:id

- **Description:** Partially updates an existing joke with the specified ID.
- **Request Parameters:** `:id` - The ID of the joke to be updated.
- **Request Body:** JSON object containing the fields to be updated.
- **Example:** 
  ```
  PATCH /jokes/1
  Request Body:
  {
    "jokeText": "Updated joke text"
  }
  ```
- **Response:** Returns the updated joke as a JSON object.

### DELETE /jokes/:id

- **Description:** Deletes the joke with the specified ID.
- **Request Parameters:** `:id` - The ID of the joke to be deleted.
- **Request Body:** JSON object containing the master key for authorization.
- **Example:** 
  ```
  DELETE /jokes/1
  Request Body:
  {
    "key": "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT"
  }
  ```
- **Response:** Returns a success message if the joke is deleted successfully.

---

---

## Building and Running Docker Image

### Building Docker Image

To build the Docker image, run the following command in your terminal:

```bash
docker build -t apitest .
```

This command will build the Docker image with the tag `apitest`.

### Running Docker Container

After building the Docker image, you can run the container using the following command:

```bash
docker run -p 3000:3000 -d --name apiTest apitest
```

This command will start a Docker container named `apiTest` in detached mode (`-d`), exposing port `3000` of the container to port `3000` of your host machine (`-p 3000:3000`). The container will run the API server.

---