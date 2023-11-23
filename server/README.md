# Tips4Trips

This Node.js application serves as the backend for an app, providing user authentication, user data management, tips handling, and messaging features. The server uses Express for handling HTTP requests, MongoDB for data storage, and various npm packages for functionality like JSON Web Token (JWT) authentication, password hashing, and CORS handling.

## Prerequisites

Before running the server, make sure you have the following prerequisites installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GuilhermeVoyna/GuilhermeVoyna.github.io
   cd <repository-directory>

2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables: 
Create a .env file in the root directory and add the following:
    ```bash
    MONGO_URI=<your-mongo-db-uri>
Replace <your-mongo-db-uri> with your MongoDB connection string.

## Usage
1. Start the server:
    ```bash
    npm run start:backend
The server will run on http://localhost:8000 by default.

2. Use the following endpoints:

- `GET /`: Test endpoint, responds with "Hello App."
- `POST /signup`: Register a new user.
- `POST /login`: Log in a user.
- `PUT /user`: Update user profile information.
- `GET /user`: Get user information by user ID.
- `GET /users`: Get a list of all users.
- `GET /tips`: Get tips not yet matched by user.
- `PUT /tip`: Add a new tip.
- `GET /tips-match`: Get tips that match a set of IDs.
- `GET /filtered-tips`: Get tips filtered by account type.
- `PUT /addmatch`: Add a match between two users.
- `GET /messages`: Get messages between two users for a specific tip.
- `POST /message`: Add a new message.
3. Make sure to handle authentication by including the token received from the login endpoint in the headers of protected routes.

## Contributing
Feel free to contribute to the development of this project by opening issues or pull requests.

## License

This project is licensed under the MIT License  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
