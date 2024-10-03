// src/components/TablesQuiz.js

import { useState, useEffect } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";

const TablesQuiz = ({ onComplete }) => {
  const [number, setNumber] = useState(0);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const num = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 10
    const multiplier = Math.floor(Math.random() * 10) + 1; // Random multiplier between 1 and 10

    setNumber(num);
    setQuestion(`What is ${num} x ${multiplier}?`);
    setCorrectAnswer((num * multiplier).toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userAnswer.trim() === "") {
      setMessage("Please enter your answer!");
      return; // Exit early if no answer
    }
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

export default TablesQuiz;
