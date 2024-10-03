// src/components/SquaresAndCubes.js

import { useState, useEffect } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";

const SquaresAndCubes = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const types = ["square", "cube"];
    const num = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
    const randomType = types[Math.floor(Math.random() * types.length)];

    setQuestion(
      randomType === "square"
        ? `Enter the square of ${num}:`
        : `Enter the cube of ${num}:`
    );

    setCorrectAnswer(
      randomType === "square" ? (num ** 2).toString() : (num ** 3).toString()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (userAnswer.trim() === "") return;

    if (userAnswer === correctAnswer) {
      setMessage("Correct!");
    } else {
      setMessage(`Wrong! The correct answer was: ${correctAnswer}.`);
    }

    setUserAnswer("");
    setTimeout(() => {
      setMessage("");
      generateQuestion();
      onComplete(); // Change quiz type after submission
    }, 2000);
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        {question}
      </Text>
      <form onSubmit={handleSubmit}>
        <Input
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
          mb={4}
        />
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </form>
      {message && (
        <Text mt={4} fontSize="xl">
          {message}
        </Text>
      )}
    </Box>
  );
};

export default SquaresAndCubes;
