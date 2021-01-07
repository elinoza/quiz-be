

  const selectQuestions= (questions,length)=> {
      array=[]
    try {
        for (let i=0; i<5; i++){
    
            let randomIndex=Math.floor(Math.random() * length)
            selectedQuestion=questions[randomIndex]
           array.push(selectedQuestion)
          }
          return array
      } catch (error) {
        throw new Error(error)
      }
    
  }

  module.exports= {
      
    selectQuestions(questions,length)
}