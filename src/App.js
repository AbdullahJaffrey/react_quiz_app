import React, { useState, useEffect } from "react";
import "./App.css";

const Quiz = () => {
  const [quizData, setQuizData] = useState([
    {
      question: "What is the capital city of France?",
      options: ["Paris", "London", "Madrid", "Berlin"],
      correctAnswer: 0
    },
    {
      question: 'Which planet is known as the "Red Planet"?',
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: 0
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Vincent van Gogh",
        "Michelangelo"
      ],
      correctAnswer: 1
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Argentina"],
      correctAnswer: 2
    },
    {
      question: "What is the chemical symbol for the element Oxygen?",
      options: ["Ox", "O", "O2", "Om"],
      correctAnswer: 1
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleAnswerSelect(null);
    }
  }, [timer]);

  const handleAnswerSelect = (selectedAnswer) => {
    const currentQuizItem = quizData[currentQuestion];

    if (selectedAnswer === currentQuizItem.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10); // Reset timer for the next question
    } else {
      setShowResult(true);
    }
  };

  const currentQuizItem = quizData[currentQuestion];

  return (
    <div className="quiz-container">
      <h1 className="quiz-heading">Quiz App</h1>
      {!showResult ? (
        <div>
          <div className="question-container">
            <h3 className="question-heading">
              Question {currentQuestion + 1}:
            </h3>
            <p>{currentQuizItem.question}</p>
          </div>
          <div className="options-container">
            {currentQuizItem.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerSelect(index)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer-container">
            <div
              className="timer-bar"
              style={{ width: `${(timer / 10) * 100}%` }}
            ></div>
            <p>Time Remaining: {timer}s</p>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <h3>Quiz Completed!</h3>
          <p>
            Your Score: {score} / {quizData.length}
          </p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <Quiz />
    </div>
  );
};

export default App;