// src/components/PrimeNumberQuiz.js

import { useState, useEffect, useRef } from "react"; // Import useRef
import { Box, Button, Text, Input } from "@chakra-ui/react";

// List of prime numbers to choose from
const primes = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
];

const PrimeQuiz = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  // Create a ref for the input
  const inputRef = useRef(null);

  useEffect(() => {
    askPrimeQuestion();
  }, []);

  // Focus the input field and select the text when a new question is generated
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on input
      inputRef.current.select(); // Select the current input value
    }
  }, [question]);

  const askPrimeQuestion = () => {
    const num = primes[Math.floor(Math.random() * primes.length)];
    setQuestion(`Is ${num} a prime number? (yes or no)`);
    setCorrectAnswer("yes"); // Since all chosen numbers are prime
    setUserAnswer("");
    setFeedback("");
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === "") {
      setFeedback("Please enter your answer!");
      return; // Exit early if no answer
    }

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
          ref={inputRef} // Attach the ref to the input
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
