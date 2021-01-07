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
  totalScore:0,
  totalDuration:30,
  questions: selectedQuestionsArray
}


    exams.push(response)
    await writeexams(exams)
    res.status(201).send(response)
  }
  catch(error){
  console.log(error)
  const err = new Error("An error occurred ")
  next(err)
  }
})

examsRouter.post("/:id/answer",async (req,res,next)=> {
  try{
    const exams = await getexams()
    const examFound= exams.find ( exam => exam._id === req.params.id )

    if (examFound){
      const questionIndex = req.body.question
      const selectedQuestion=examFound.questions[questionIndex]
      const providedanswer =req.body.answer
      selectedQuestion.providedAnswer=providedanswer
      const score=(selectedQuestion.answers[providedanswer].isCorrect) === true ?  20 : 0
      examFound.totalScore+= score

      console.log(examFound.totalScore)

      await writeexams(exams)
      res.status(201).send("your answer is posted succesfully baby")
    

    }
    else { 
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
    
    }
    catch(error){
    console.log(error)
    const err = new Error("An error occurred ")
    next(err)
    }
  })

examsRouter.get("/:id",async (req,res,next)=> {
    try{
      const exams = await getexams()
      const examFound= exams.find ( exam => exam._id === req.params.id )
  
      if (examFound){
        res.send(examFound)
      }
      else { 
        const err = new Error()
        err.httpStatusCode = 404
        next(err)
      }
      
      }
      catch(error){
      console.log(error)
      const err = new Error("An error occurred")
      next(err)
      }
    })






module.exports = examsRouter
