
# Root Project

This project consists of two main parts:
- A React TypeScript frontend located in the `client` directory.
- An Express TypeScript backend located in the `api` directory.

## Prerequisites

Make sure you have the following installed on your system:
- Node.js and npm: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community) or use MongoDB Atlas for a cloud-based solution.

## Project Setup

### Step 1: Install Dependencies

First, you need to install the dependencies for both the `client` and `api` directories.

1. Open a terminal and navigate to the `client` directory and install the dependencies:
    ```bash
    cd client
    npm install
    ```

2. Open another terminal and navigate to the `api` directory and install the dependencies:
    ```bash
    cd api
    npm install
    ```

### Step 2: Setup Environment Variables for the API

1. Navigate to the `api` directory and create a `.env` file:
    ```bash
    cd api
    touch .env
    ```

2. Open the `.env` file and add the following lines:
    ```env
    PORT=9000
    MONGODBURL=your_mongodb_connection_string
    ```

    You will need to find a MongoDB connection string for yourself. If you don't already have one, you can use [MongoDB Compass](https://www.mongodb.com/products/compass) to create a MongoDB database and get the connection string.

### Step 3: Run the Projects

After installing the dependencies and setting up the environment variables, you can start both projects.

1. **Running the Client**
    Open a terminal, navigate to the `client` directory, and start the React application:
    ```bash
    cd client
    npm start
    ```

2. **Running the API**
    Open another terminal, navigate to the `api` directory, and start the Express server:
    ```bash
    cd api
    npm start
    ```

## Additional Information

- The React application will typically run on `http://localhost:3000`.
- The Express server will run on `http://localhost:9000` as configured in the `.env` file.

If you encounter any issues or have any questions, feel free to open an issue or reach out for help.
