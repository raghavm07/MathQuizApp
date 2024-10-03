import { useState, useEffect, useRef } from "react";
import { Box, Button, Text, Input, Progress } from "@chakra-ui/react";

const fractions = [
  { fraction: "1/2", percentage: 50 },
  { fraction: "1/3", percentage: 33.33 },
  { fraction: "2/3", percentage: 66.67 },
  { fraction: "1/4", percentage: 25 },
  { fraction: "3/4", percentage: 75 },
  { fraction: "1/5", percentage: 20 },
  { fraction: "2/5", percentage: 40 },
  { fraction: "3/5", percentage: 60 },
  { fraction: "4/5", percentage: 80 },
  { fraction: "1/6", percentage: 16.67 },
  { fraction: "5/6", percentage: 83.33 },
  { fraction: "1/8", percentage: 12.5 },
  { fraction: "3/8", percentage: 37.5 },
  { fraction: "5/8", percentage: 62.5 },
  { fraction: "7/8", percentage: 87.5 },
  { fraction: "1/10", percentage: 10 },
  { fraction: "1/12", percentage: 8.33 },
  { fraction: "1/16", percentage: 6.25 },
  { fraction: "1/9", percentage: 11.11 },
  { fraction: "2/9", percentage: 22.22 },
  { fraction: "5/9", percentage: 55.56 },
  { fraction: "7/9", percentage: 77.78 },
  { fraction: "1/15", percentage: 6.67 },
  { fraction: "2/15", percentage: 13.33 },
  { fraction: "4/15", percentage: 26.67 },
  { fraction: "8/15", percentage: 53.33 },
  { fraction: "3/10", percentage: 30 },
  { fraction: "7/10", percentage: 70 },
  { fraction: "9/10", percentage: 90 },
  { fraction: "3/12", percentage: 25 }, // Equivalent to 1/4
  { fraction: "5/12", percentage: 41.67 },
  { fraction: "7/12", percentage: 58.33 },
  { fraction: "11/12", percentage: 91.67 },
];

const FractionQuiz = ({ onComplete }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(10); // 10 seconds timer
  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef(null); // Ref for input field

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timer > 0 && isActive) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0)); // Timer decrement logic
      }, 1000);

      return () => clearInterval(interval); // Clean up timer on unmount
    } else if (timer === 0) {
      handleTimeUp(); // Handle time up when timer hits 0
    }
  }, [timer, isActive]);

  // Focus the input when a new question is generated
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [question]);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * fractions.length);
    const { fraction, percentage } = fractions[randomIndex];

    setQuestion(`What is ${fraction} as a percentage?`);
    setCorrectAnswer(percentage.toFixed(2));
    setUserAnswer("");
    setMessage("");
    setTimer(10); // Reset the timer for each new question
    setIsActive(true);
  };

  const handleTimeUp = () => {
    setMessage(`Time's up! The correct answer was: ${correctAnswer}.`);
    setUserAnswer("");
    setIsActive(false);

    setTimeout(() => {
      generateQuestion();
      onComplete(); // Move to the next quiz after a delay
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

    setIsActive(false); // Stop the timer once the answer is submitted
    setTimeout(() => {
      generateQuestion();
      onComplete(); // Move to the next quiz after submission
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
          ref={inputRef} // Attach ref to input
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

export default FractionQuiz;
