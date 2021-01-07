const express = require("express")
const uniqid = require("uniqid")
// const { join } = require("path")
// const { getattendees, writeattendees } = require("../../fsUtilities")
const attendeesRouter = express.Router()
exams.post("/start",async (req,res,next)=> {
try{
  const attendees = await getattendees()

  const idFound = attendees.find(attendee => attendee.id === req.body.id)

  if (idFound) {
    const error = new Error()
    error.httpStatusCode = 400
    error.message = "attendee already in db"
    next(error)
  } else {
    attendees.push({...req.body,id:uniqid()})
    await writeattendees(attendees)
    res.status(201).send("ok")
  }}
catch(error){
  console.log(error)
  const err = new Error("An error occurred while reading from the file")
  next(err)
}
})

attendeesRouter.get("/csv",async (req,res,next)=> {
  try {
    const path = join(__dirname, "attendees.json")
    const jsonReadableStream = createReadStream(path)

    const json2csv = new Transform({
      fields: ["firstName", "secondName", "email", "id"],
    })

    res.setHeader("Content-Disposition", "attachment; filename=export.csv")
    pipeline(jsonReadableStream, json2csv, res, err => {
      if (err) {
        console.log(err)
        next(err)
      } else {
        console.log("Done")
      }
    })
  } catch (error) {
    next(error)
  }
})

attendeesRouter.post("/send", async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: "helenstudyo@gmail.com",
      from: "hillcakmak@gmail.com",
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    }

    await sgMail.send(msg)
    res.send("sent")
  } catch (error) {
    next(error)
  }
})

module.exports = attendeesRouter
