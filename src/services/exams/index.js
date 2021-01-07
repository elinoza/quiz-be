const express = require("express")
const uniqid = require("uniqid")
const { join } = require("path")
const { getexams, writeexams ,getquestions} = require("../../fsUtilities")
// const { selectQuestions} = require("../../functions.js")
const examsRouter = express.Router()

const pickQuestions = (maxDuration,numberOfQuestions,length) => {
  /**
   *  choose question
   *  currentDuration+=question.duration
   *  if currentDuration is lt  maxDuration
   *     add question to array
   * else 
   *    step 1
   * 
   */
  let selectedQuestionsArray=[]
  currentDuration=0;
  questions = []
  while(currentDuration<maxDuration){
    let randomIndex=Math.floor(Math.random() * length)
    let selectedQuestion=questions[randomIndex]
    
    if(currentDuration+selectedQuestion.duration<maxDuration){
      selectedQuestionsArray.push(selectedQuestion)
      currentDuration+=selectedQuestion.duration
    }
    else{
      if(selectedQuestionsArray===numberOfQuestions)

      break;


    }
    

  }
}

examsRouter.post("/start",async (req,res,next)=> {
try{
  const exams = await getexams()
  const questions = await getquestions()
  //let selectedQuestionsArray=[]
  const TotalDuration=300
  // let duration= 0
pickQuestions(TotalDuration, 5,questions.length)

  // for (let i=0; i<5; i++){
  //   let randomIndex=Math.floor(Math.random() * questions.length)
  //   selectedQuestion=questions[randomIndex]
  //   duration+= selectedQuestion.duration 
  //   if (duration >TotalDuration){ i -= 1 }
  //   else{selectedQuestionsArray.push(selectedQuestion)}
    
  // }
  
const response={
  ...req.body,
  _id:uniqid(),
  examDate:new Date(),
  isCompleted:false,
  name: "Admission Test",
  totalScore:0,
  totalDuration:TotalDuration,
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
