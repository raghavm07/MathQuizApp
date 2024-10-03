import { useState, useEffect, useRef } from "react"; // Import useRef
import { Box, Button, Text, Input, Progress } from "@chakra-ui/react";

const PrimeQuiz = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(10); // Timer starts at 10 seconds
  const [isActive, setIsActive] = useState(true); // Track if the timer is active

  const inputRef = useRef(null); // Create a ref for the input field

  useEffect(() => {
    askPrimeQuestion(); // Start with a new question
  }, []);

  useEffect(() => {
    if (timer > 0 && isActive) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0)); // Stop at 0
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    } else if (timer === 0) {
      handleTimeUp(); // Trigger time-up when the timer hits 0
    }
  }, [timer, isActive]);

  // Focus input field and select text when a new question is generated
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [question]);

  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const askPrimeQuestion = () => {
    const num = Math.floor(Math.random() * 200) + 1; // Random number between 1 and 200
    const isNumPrime = isPrime(num);
    setQuestion(`Is ${num} a prime number? (yes or no)`);
    setCorrectAnswer(isNumPrime ? "yes" : "no"); // Determine correct answer
    setUserAnswer("");
    setFeedback("");
    setTimer(10); // Reset timer to 10 seconds for each question
    setIsActive(true); // Restart the timer for the next question
  };

  const handleTimeUp = () => {
    setFeedback(`Time's up! The correct answer was: ${correctAnswer}.`);
    setUserAnswer(""); // Clear the input
    setIsActive(false); // Stop the timer

    setTimeout(() => {
      askPrimeQuestion(); // Generate a new question
      onComplete(); // Move to the next quiz after a short delay
    }, 3000);
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === "") {
      setFeedback("Please enter your answer!");
      return; // Exit early if no answer
    }

    const normalizedAnswer = userAnswer.trim().toLowerCase();
    if (normalizedAnswer === correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Wrong! ${question.split(" ")[1]} is ${
          correctAnswer === "yes" ? "a prime" : "not a prime"
        } number.`
      );
    }

    setUserAnswer(""); // Clear the input
    setIsActive(false); // Stop the timer once the answer is submitted
    setTimeout(() => {
      askPrimeQuestion();
      onComplete(); // Move to the next quiz after a short delay
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

      <form onSubmit={handleAnswer}>
        <Input
          ref={inputRef} // Attach ref to input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
          size="lg"
          focusBorderColor="teal.400"
          mb={4}
        />
        <Button type="submit" colorScheme="teal" size="lg" width="full">
          Submit
        </Button>
      </form>

      {feedback && (
        <Text
          mt={4}
          fontSize="xl"
          textAlign="center"
          color={feedback === "Correct!" ? "green.500" : "red.500"}
        >
          {feedback}
        </Text>
      )}
    </Box>
  );
};

export default PrimeQuiz;
