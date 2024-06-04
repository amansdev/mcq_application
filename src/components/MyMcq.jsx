import React, { useState, useEffect } from "react";
import "./MyMcq.css";
import questions from "../questions.json";
import Icon from "../assets/images/Icon";

function MyMcq() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [stars, setStars] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5); // make answer randaom places
  };

  const handleOptionSelection = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOptions([]);
  };

  const calculateStars = () => {
    const difficulty = questions[currentQuestion].difficulty;
    if (difficulty === "easy") {
      setStars(1);
    } else if (difficulty === "medium") {
      setStars(2);
    } else {
      setStars(3);
    }
  };

  useEffect(() => {
    calculateStars();
    const options = [
      questions[currentQuestion].correct_answer,
      ...questions[currentQuestion].incorrect_answers,
    ];
    setShuffledOptions(shuffleOptions(options));
    // eslint-disable-next-line
  }, [currentQuestion]);

  const progressBarWidth = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <div className="main">
        <div className="progress-bar">
          <div
            className="progress-bar-inner"
            style={{ width: `${progressBarWidth}%` }}
          />
        </div>
        <h1>
          Question {currentQuestion + 1} of {questions.length}
        </h1>
        <div>
          <div>
            <h2>Difficulty: {questions[currentQuestion].difficulty}</h2>
            <h2> {questions[currentQuestion].category}</h2>
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  fill={index < stars ? "#000" : "none"}
                  stroke={"#000"}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="questionHeading">
            <h2>{questions[currentQuestion].question}</h2>
          </div>
        </div>
        <div>
          <div className="answerButtonParent">
            {shuffledOptions.map((option, index) => (
              <div className="answerButtonParent">
                <input
                  type="radio"
                  name={`option-${currentQuestion}`}
                  id={`${currentQuestion}-${index}`}
                  className="visually-hidden"
                  value={option}
                  onChange={() => handleOptionSelection(option)}
                  checked={selectedOptions.includes(option)}
                  disabled={
                    selectedOptions.length > 0 &&
                    !selectedOptions.includes(option)
                  }
                />
                <label
                  key={index}
                  color="primary"
                  htmlFor={`${currentQuestion}-${index}`}
                  className="answerButton"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        {selectedOptions.length > 0 && (
          <>
            {selectedOptions.includes(
              questions[currentQuestion].correct_answer
            ) ? (
              <div>
                <div className="center">
                  <h1>Correct!</h1>
                </div>
              </div>
            ) : (
              <div>
                <div className="center">
                  <h2>Sorry. Please try again.</h2>
                </div>
              </div>
            )}
          </>
        )}
        {selectedOptions.length > 0 && (
          <div>
            <div xs="12" className="center">
              <button
                color="primary"
                onClick={handleNextQuestion}
                className="nextButton"
                disabled={currentQuestion === questions.length - 1}
              >
                {currentQuestion === questions.length - 1
                  ? "Completed !"
                  : "Next Question"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyMcq;
