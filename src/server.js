const express = require("express")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")


const examsRoutes = require("./services/exams")


const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers")

const server = express()

const port = process.env.PORT || 3005

server.use(express.json())

server.use(cors()) // CROSS ORIGIN RESOURCE SHARING

//ROUTES


 server.use("/exams", examsRoutes)


//ERROR HANDLERS
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)
console.log(listEndpoints(server))

server.listen(port, () => {

    console.log("Running locally on port", port)

})
