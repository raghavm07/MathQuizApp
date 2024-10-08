// src/App.js

import { useState } from "react";
import {
  Button,
  Box,
  Heading,
  HStack,
  Text,
  Link,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
import PrimeQuiz from "./components/PrimeNumberQuiz";
import SquareCubeRoot from "./components/SquareCubeRoot";
import SquaresAndCubes from "./components/SquaresAndCubes";
import FractionQuiz from "./components/FractionQuiz";
import TablesQuiz from "./components/TablesQuiz";
import ToneQuiz from "./components/ToneQuiz";

const App = () => {
  const [quizType, setQuizType] = useState("");
  const [isRandom, setIsRandom] = useState(false);

  const quizOptions = [
    "primes",
    "squaresAndCubes",
    "fractions",
    "squareAndCubeRoots",
    "tables",
    "tone",
  ];

  const handleQuizSelection = (type) => {
    // Only allow selection if not in random mode
    if (!isRandom) {
      setQuizType(type);
    }
  };

  const handleRandomQuiz = () => {
    // Start the random quiz by selecting an initial quiz type
    selectRandomQuiz();
    setIsRandom(true); // Mark it as a random selection
  };

  const selectRandomQuiz = () => {
    const randomType =
      quizOptions[Math.floor(Math.random() * quizOptions.length)];
    setQuizType(randomType); // Set a new random quiz type
  };

  const renderQuiz = () => {
    switch (quizType) {
      case "primes":
        return (
          <PrimeQuiz onComplete={isRandom ? selectRandomQuiz : () => {}} />
        );
      case "squaresAndCubes":
        return (
          <SquaresAndCubes
            onComplete={isRandom ? selectRandomQuiz : () => {}}
          />
        );
      case "fractions":
        return (
          <FractionQuiz onComplete={isRandom ? selectRandomQuiz : () => {}} />
        );
      case "squareAndCubeRoots":
        return (
          <SquareCubeRoot onComplete={isRandom ? selectRandomQuiz : () => {}} />
        );
      case "tables":
        return (
          <TablesQuiz onComplete={isRandom ? selectRandomQuiz : () => {}} />
        );
      case "tone": // Add case for tone quiz
        return <ToneQuiz onComplete={isRandom ? selectRandomQuiz : () => {}} />;
      default:
        return null;
    }
  };

  const handleStopRandomQuiz = () => {
    setIsRandom(false);
    setQuizType(""); // Optionally reset the quizType if you want to clear the selected quiz
  };

  return (
    <>
      <Box className="App" p={5} maxW="4xl" mx="auto" mb={40}>
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Quiz
        </Heading>
        <HStack spacing={4} mb={4} wrap="wrap" justify="center">
          <Button
            variant={quizType === "primes" ? "solid" : "outline"}
            colorScheme="blue"
            onClick={() => handleQuizSelection("primes")}
            isDisabled={isRandom} // Disable if in random mode
          >
            Prime Numbers
          </Button>
          <Button
            variant={quizType === "squaresAndCubes" ? "solid" : "outline"}
            colorScheme="green"
            onClick={() => handleQuizSelection("squaresAndCubes")}
            isDisabled={isRandom} // Disable if in random mode
          >
            Squares and Cubes
          </Button>
          <Button
            variant={quizType === "fractions" ? "solid" : "outline"}
            colorScheme="teal"
            onClick={() => handleQuizSelection("fractions")}
            isDisabled={isRandom} // Disable if in random mode
          >
            Fractions
          </Button>
          <Button
            variant={quizType === "squareAndCubeRoots" ? "solid" : "outline"}
            colorScheme="purple"
            onClick={() => handleQuizSelection("squareAndCubeRoots")}
            isDisabled={isRandom} // Disable if in random mode
          >
            Square and Cube Roots
          </Button>

          <Button
            variant={quizType === "tables" ? "solid" : "outline"}
            colorScheme="red"
            onClick={() => handleQuizSelection("tables")}
            isDisabled={isRandom}
          >
            Tables
          </Button>

          <Button
            variant={quizType === "tone" ? "solid" : "outline"} // Add button for tone quiz
            colorScheme="orange"
            onClick={() => handleQuizSelection("tone")}
            isDisabled={isRandom} // Disable if in random mode
          >
            Tone Quiz
          </Button>

          <Button
            colorScheme="orange"
            variant={isRandom ? "solid" : "outline"} // Change the variant based on isRandom
            onClick={handleRandomQuiz}
          >
            Random Quiz
          </Button>
        </HStack>
        <Box
          mt={8}
          className="quiz-container"
          p={4}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
        >
          {renderQuiz()}
        </Box>
        {isRandom && (
          <Button mt={4} colorScheme="red" onClick={handleStopRandomQuiz}>
            Stop Random Quiz
          </Button>
        )}
      </Box>
      <Box
        as="footer"
        bg="gray.800"
        color="white"
        p={6}
        textAlign="center"
        position="fixed" // Make the footer fixed
        bottom={0} // Position it at the bottom
        left={0} // Align it to the left
        right={0} // Align it to the right
      >
        <Stack direction="row" spacing={4} justify="center" align="center">
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Math Quiz App. All rights
            reserved.
          </Text>
          <Text fontSize="sm">
            Created by{" "}
            <Link
              color="teal.300"
              href="https://in.linkedin.com/in/raghavmittal79"
              isExternal
            >
              Raghav
            </Link>
          </Text>

          <Link href="https://in.linkedin.com/in/raghavmittal79" isExternal>
            <Icon as={FaLinkedin} boxSize={6} />
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default App;
