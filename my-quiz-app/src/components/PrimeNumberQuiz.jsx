// src/components/PrimeNumberQuiz.js

import { useState, useEffect } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";

// List of prime numbers to choose from
const primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
];

const PrimeQuiz = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    askPrimeQuestion();
  }, []);

  const askPrimeQuestion = () => {
    const num = primes[Math.floor(Math.random() * primes.length)];
    setQuestion(`Is ${num} a prime number? (yes or no)`);
    setCorrectAnswer("yes"); // Since all chosen numbers are prime
    setUserAnswer("");
    setFeedback("");
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    //  if (userAnswer === "") return;

    // Check if the user's answer is correct
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    if (normalizedAnswer === correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! It is a prime number.`);
    }

    // Clear the input
    setUserAnswer("");

    // Call onComplete to change quiz type after a delay
    setTimeout(() => {
      askPrimeQuestion();
      onComplete();
    }, 2000);
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        {question}
      </Text>
      <form onSubmit={handleAnswer}>
        <Input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          mb={4}
        />
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </form>
      <Text mt={4} fontSize="xl">
        {feedback}
      </Text>
    </Box>
  );
};

export default PrimeQuiz;
