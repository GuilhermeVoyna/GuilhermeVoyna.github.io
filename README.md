
# TIP4TRIPS App
## Frontend
Dashboard Frontend
This is the frontend component for the app's dashboard. It utilizes React and integrates with various features such as user authentication, card swiping, messaging, and displaying user tips. The main functionality is built on the react-tinder-card library to create a card-swiping interface.

Installation
To run the frontend, follow these steps:
1. Clone the repository:
    ```bash
    git clone https://github.com/GuilhermeVoyna/GuilhermeVoyna.github.io
    cd client
2. Install dependencies:
    ```bash
    npm install
## Usage
1. Start the development server:
    ```bash
    npm run start
The frontend will be accessible at http://localhost:3000.


## Features
- Card Swiping: Users can swipe left or right on cards representing tips, with actions triggering specific interactions.
- Messaging: Connect with other users through a messaging system.
- Tip Management: Add and view tips.
- User Onboarding: Collect user information, including name, birthday, account type, premium status, about section, and profile picture URL.
- Form Handling: The form handles user input, and the state is updated accordingly to facilitate form submission.
- Profile Picture Preview: Users can preview their profile picture before submitting the form.
- Navigation: The `useNavigate` hook from React Router is used for navigation to the dashboard after successful onboarding.
## Components
 - Dashboard Component
The `Dashboard` component serves as the main interface for users. It fetches user data, manages card swiping, and integrates with additional components.

- Tip Component
The Tip component is designed for users with the account type "tiper." It provides functionality for adding new tips.

- ChatContainer Component
The ChatContainer component handles user messaging, displaying a list of matched users and providing a chat interface.

- CardInfo Component
The CardInfo component displays detailed information about a tip when the information button (ℹ️) is clicked.

- Home Component
The Home component is the landing page of the app, providing a simple interface with a title and a button for user authentication.

- Nav Component
The Nav component provides navigation functionality, including a button to open the authentication modal.

- AuthModal Component
The AuthModal component handles user authentication, providing a form for signing in or signing up.
    

## Backend

This Node.js application serves as the backend for an app, providing user authentication, user data management, tips handling, and messaging features. The server uses Express for handling HTTP requests, MongoDB for data storage, and various npm packages for functionality like JSON Web Token (JWT) authentication, password hashing, and CORS handling.

## Prerequisites

Before running the server, make sure you have the following prerequisites installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GuilhermeVoyna/GuilhermeVoyna.github.io
   cd server

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
