const quizContainer = document.getElementById("quiz")
const quizQuestion = document.getElementById("question")
const quizAnswers = document.getElementById("answers")
const submitButton = document.getElementById("submit")
const resultsContainer = document.getElementById("result")
const type = document.getElementById("radio");
// const b_text = document.getElementById("b_text");
// const c_text = document.getElementById("c_text");

const myQuestions = [
    {
        question: "What is the capital of France?",
        answers: {
        a: "Paris",
        b: "London",
        c: "New York"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the largest country in the world?",
        answers: {
        a: "Russia",
        b: "China",
        c: "United States"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the currency of Japan?",
        answers: {
        a: "Yuan",
        b: "Euro",
        c: "Yen"
        },
        correctAnswer: "c"
    },
    {
        question: "Which bank is called bankers Bank of India?",
        answers: {
        a: "Reserve Bank of India",
        b: "Punjab National Bank",
        c: "State Bank of India"

         },
         correctAnswer: "a"
    },
    {
        question: "Which state has the longest coastal line in India?",
        answers: {
        a: "Gujarat",
        b: "Kerala",
        c: "West Bengal"
        },
        correctAnswer: "a"
    }
    ];
    // Function to start the quiz
function startQuiz() {
  // Hide the start button and display the first question
  document.getElementById("start-button").style.display = "none";
  buildQuiz();
  startTimer();
}
   function buildQuiz (){
    const output = [] /*In this array we will put all questions and answers */
    // first loop will goes to all object.
    // second loop will deals with answer
    myQuestions.forEach((currentQuestion, questionNumber)=> {
        const answers = []
        for (letter in currentQuestion.answers) {
            answers.push(
                `<label><input type ="radio" name="question${questionNumber}" value="${letter}"/>${letter} : ${currentQuestion.answers[letter]}</label>`
            )
           
        }
        // console.log(answers);
        // pushing in output question
        output.push(
            `<div class="question">${currentQuestion.question}</div>
            <div class="answers">${answers.join('')}</div>` 
        )
    })
    // console.log(output);
    // dispaying question on display
    quizContainer.innerHTML = output.join('')
    
      
   }
   function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers')
    let numCorrect = 0
    myQuestions.forEach((currentQuestion, questionNumber)=>{
        // find selected answer
        const answerContainer = answerContainers[questionNumber]
          // input[name=question1]:checked
          const selector = `input[name=question${questionNumber}]:checked`
          const userAnswer = (answerContainer.querySelector(selector) || {}).value
          if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++
            answerContainers[questionNumber].style.color = 'green'
          }
          else{
            answerContainers[questionNumber].style.color = 'red'
          }
    })
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`
     
    endQuiz()

   }
   buildQuiz()
   let timeLeft = 30;
let timerInterval;
   // Function to start the timer
function startTimer() {
    timerInterval = setInterval(function() {
      timeLeft--;
  
      // Update the timer text
      document.getElementById("timer").textContent = timeLeft;
  
      // End the quiz if time runs out
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  function endQuiz() {
    let timeLeft = 0;
    clearInterval(timerInterval);
  }
  document.getElementById("start-button").addEventListener("click", startQuiz);
   submitButton.addEventListener('click', showResults)
