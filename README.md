# NaruSearch

NaruSearch is a full-stack web application that provides user authentication (login and registration) and a protected home page that displays user details. It uses a Node.js/Express backend with MongoDB and a React frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Features

- User Registration with validation
- User Login with JWT authentication
- Protected routes
- Profile display
- 404 Page for undefined routes

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Joi for validation

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- React Hook Form

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: installed on your machine.
- **npm**: (Node Package Manager) installed.
- **MongoDB**: You need a MongoDB connection string (URI).

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_folder>
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

## Configuration

### Backend

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGODB_URI=<Your MongoDB Connection URI>
JWT_SECRET=<Your Secret Key for JWT>
PORT=8000
```

## Running the Application

### Running the Backend

From the `backend` directory:

```bash
npm start
```
The server will start on port 8000 (or the port specified in your .env file).

### Running the Frontend

From the `frontend` directory:

```bash
npm start
```
The application will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
.
├── backend/                # Backend source code
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions (auth)
│   └── server.js           # Entry point for backend
├── frontend/               # Frontend source code
│   ├── public/             # Static files
│   └── src/                # React components and pages
│       ├── pages/          # Application pages (Home, Login, Register, 404)
│       └── App.js          # Main React component
└── README.md               # Project documentation
```
