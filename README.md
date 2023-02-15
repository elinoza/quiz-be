# Quiz Game Backend 👨‍🏫
This is the backend server for the  Quiz Game project, written in ` Node.js ` using the ` Express web framework `.

## Setup 🛠️
To install the dependencies, run:
`npm install`

To start the server, run:
`npm start`
By default, the server will start on port 3005.

## Environment variables 🌳
The following environment variables can be set to configure the server:

DATABASE_URL: the URL of the MongoDB database used to store quiz questions and answers (e.g. mongodb://localhost/quiz-game)
PORT: the port number to listen on (default is 3000)

To set environment variables, create a .env file in the root directory of the project and add the variables and their values, like so:
`
DATABASE_URL=mongodb://localhost/quiz-game
PORT=3000
``
Note:.env file is not ignored in this project.

## API routes 🚀
The following API routes are available:

1. POST /start  :creates a new quiz including 5 randomly selected questions ,triggered by user posting name&surname and clicking start button 
2. POST/:id/answer : posting provided answer for each question and calculation of score
3. GET/:id :submits  returns their score

##File system operations 📁
This project uses the fs-extra module for file system operations, which provides additional functionality on top of the built-in fs module. Some of the methods used in this project include:

readJson(): reads a JSON file and returns the parsed JSON object
writeJson(): writes a JSON object to a file
ensureDir(): creates a directory if it does not exist
remove(): removes a file or directory

## Technologies used 🚀
Node.js
Express
MongoDB
fs-extra

##Contributing 👥
Feel free to submit pull requests and report issues.
