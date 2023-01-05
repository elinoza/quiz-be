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

server.use(cors())
server.use(express.json())
const whiteList =[ "http://localhost:3000/"]

const corsOptions ={
        origin: function (origin, callback) {
          if (whiteList.indexOf(origin) !== -1) {
            // allowed
            callback(null, true)
          } else {
            // Not allowed
            callback(new Error("NOT ALLOWED - CORS ISSUES"))
          }
        },
      }
 
 // CROSS ORIGIN RESOURCE SHARING
 

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
