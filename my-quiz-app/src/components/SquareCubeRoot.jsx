import { useState, useEffect, useRef } from "react";
import { Box, Button, Text, Input, Progress } from "@chakra-ui/react";

const SquareCubeRoot = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(10); // 10-second timer
  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef(null); // Ref for input field

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timer > 0 && isActive) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleTimeUp(); // Handle time up logic
    }
  }, [timer, isActive]);

  // Focus and select input when a new question is generated
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [question]);

  const generateQuestion = () => {
    const types = ["squareRoot", "cubeRoot"];
    const num = Math.floor(Math.random() * 30) + 1; // Random number between 1 and 30
    const randomType = types[Math.floor(Math.random() * types.length)];

    setQuestion(
      randomType === "squareRoot"
        ? `Enter the square root of ${num ** 2}:`
        : `Enter the cube root of ${num ** 3}:`
    );

    setCorrectAnswer(
      randomType === "squareRoot"
        ? Math.sqrt(num ** 2).toFixed(2)
        : Math.cbrt(num ** 3).toFixed(2)
    );

    setUserAnswer("");
    setMessage("");
    setTimer(10); // Reset the timer for each question
    setIsActive(true);
  };

  const handleTimeUp = () => {
    setMessage(`Time's up! The correct answer was: ${correctAnswer}.`);
    setUserAnswer("");
    setIsActive(false);

    setTimeout(() => {
      generateQuestion();
      onComplete(); // Move to the next quiz after delay
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === "") {
      setMessage("Please enter your answer!");
      return;
    }

    if (parseFloat(userAnswer).toFixed(2) === correctAnswer) {
      setMessage("Correct!");
    } else {
      setMessage(`Wrong! The correct answer was: ${correctAnswer}.`);
    }

    setIsActive(false); // Stop the timer on submission
    setTimeout(() => {
      generateQuestion();
      onComplete(); // Move to the next quiz
    }, 3000);
  };

  return (
    <Box
      p={4}
      //   p={6}
      //   maxW="500px"
      //   mx="auto"
      //   borderWidth="1px"
      //   borderRadius="lg"
      //   boxShadow="lg"
    >
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        {question}
      </Text>

      <Progress
        value={(timer / 10) * 100}
        size="sm"
        colorScheme="teal"
        mb={4}
      />

      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
          size="lg"
          focusBorderColor="teal.400"
          mb={4}
        />
        <Button type="submit" colorScheme="teal" size="lg" width="full">
          Submit
        </Button>
      </form>

      {message && (
        <Text
          mt={4}
          fontSize="xl"
          textAlign="center"
          color={message.includes("Correct") ? "green.500" : "red.500"}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

export default SquareCubeRoot;
