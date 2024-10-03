// src/components/SquaresAndCubes.js

import { useState, useEffect, useRef } from "react"; // Import useRef
import { Box, Button, Text, Input } from "@chakra-ui/react";

const SquaresAndCubes = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  // Create a ref for the input
  const inputRef = useRef(null);

  useEffect(() => {
    generateQuestion();
  }, []);

  // Focus the input field and select the text when a new question is generated
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on input
      inputRef.current.select(); // Select the current input value
    }
  }, [question]);

  const generateQuestion = () => {
    const types = ["square", "cube"];
    const num = Math.floor(Math.random() * 30) + 1; // Random number between 1 and 30
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

    // Check for empty input
    if (userAnswer.trim() === "") {
      setMessage("Please enter your answer!");
      return; // Exit early if no answer
    }

    // Check the user's answer
    if (userAnswer === correctAnswer) {
      setMessage("Correct!");
    } else {
      setMessage(`Wrong! The correct answer was: ${correctAnswer}.`);
    }

    setUserAnswer(""); // Clear input field
    setTimeout(() => {
      setMessage(""); // Clear message after a short delay
      generateQuestion(); // Generate a new question
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
          ref={inputRef} // Attach the ref to the input
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
        <Text
          mt={4}
          fontSize="xl"
          color={message.startsWith("Wrong") ? "red.500" : "green.500"}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

export default SquaresAndCubes;
