// src/components/QuizContainer.js

import { useState } from "react";
import SquaresAndCubes from "./SquaresAndCubes";
import SquareCubeRoot from "./SquareCubeRoot";
import PrimeNumberQuiz from "./PrimeNumberQuiz";
import FractionQuiz from "./FractionQuiz";

const QuizContainer = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0); // 0 for Squares and Cubes, 1 for Square/Cube Root, 2 for Prime Number, 3 for Fractions

  const handleNextQuiz = () => {
    setCurrentQuiz((prev) => (prev + 1) % 4); // Cycle through quizzes
  };

  return (
    <>
      {currentQuiz === 0 && <SquaresAndCubes onNext={handleNextQuiz} />}
      {currentQuiz === 1 && <SquareCubeRoot onNext={handleNextQuiz} />}
      {currentQuiz === 2 && <PrimeNumberQuiz onNext={handleNextQuiz} />}
      {currentQuiz === 3 && <FractionQuiz onNext={handleNextQuiz} />}
    </>
  );
};

export default QuizContainer;
