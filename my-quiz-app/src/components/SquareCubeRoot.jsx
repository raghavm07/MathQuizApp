// src/components/SquareCubeRoot.js

import { useState, useEffect, useRef } from "react"; // Import useRef
import { Box, Button, Text, Input } from "@chakra-ui/react";

const SquareCubeRoot = ({ onComplete }) => {
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
    const types = ["squareRoot", "cubeRoot"];
    const num = Math.floor(Math.random() * 30) + 1; // Random number between 1 and 20
    const randomType = types[Math.floor(Math.random() * types.length)];

    setQuestion(
      randomType === "squareRoot"
        ? `Enter the square root of ${num ** 2}:`
        : `Enter the cube root of ${num ** 3}:`
    );

    // Use toFixed(2) to ensure consistency in decimal places
    setCorrectAnswer(
      randomType === "squareRoot"
        ? Math.sqrt(num ** 2).toFixed(2)
        : Math.cbrt(num ** 3).toFixed(2)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === "") {
      setMessage("Please enter your answer!");
      return; // Exit early if no answer
    }

    // Compare user answer to correct answer
    if (parseFloat(userAnswer).toFixed(2) === correctAnswer) {
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

export default SquareCubeRoot;
