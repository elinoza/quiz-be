const express = require("express")
const uniqid = require("uniqid")
const { join } = require("path")
const { getexams, writeexams ,getquestions} = require("../../fsUtilities")
// const { selectQuestions} = require("../../functions.js")
const examsRouter = express.Router()

examsRouter.post("/start",async (req,res,next)=> {
try{
  const exams = await getexams()
  const questions = await getquestions()
  let selectedQuestionsArray=[]
  for (let i=0; i<5; i++){
    
    let randomIndex=Math.floor(Math.random() * questions.length)
    selectedQuestion=questions[randomIndex]
    selectedQuestionsArray.push(selectedQuestion)
  }
  
const response={
  ...req.body,
  _id:uniqid(),
  examDate:new Date(),
  isCompleted:false,
  name: "Admission Test",
  providedAnswer:'',
  questions: selectedQuestionsArray
}

    exams.push(response)
    await writeexams(exams)
    res.status(201).send(response)
  }
  catch(error){
  console.log(error)
  const err = new Error("An error occurred while reading from the file")
  next(err)
  }
})

examsRouter.post("/:id/answer",async (req,res,next)=> {
  try{
    const exams = await getexams()
    const examFound= exams.find ( exam => exam._id === req.params.id )
    if (examFound){
      examFound.questions[0].push({...req.body})



    }
    else { 
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
    
   
    }
    catch(error){
    console.log(error)
    const err = new Error("An error occurred while reading from the file")
    next(err)
    }
  })






module.exports = examsRouter
