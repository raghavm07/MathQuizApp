// // src/components/Quiz.js

// import { useState, useEffect } from "react";
// import { Box, Button, Text, Input } from "@chakra-ui/react";

// const fractions = [
//   { fraction: "1/2", percentage: 50 },
//   { fraction: "1/3", percentage: 33.33 },
//   { fraction: "2/3", percentage: 66.67 },
//   { fraction: "1/4", percentage: 25 },
//   { fraction: "3/4", percentage: 75 },
//   { fraction: "1/5", percentage: 20 },
//   { fraction: "2/5", percentage: 40 },
//   { fraction: "3/5", percentage: 60 },
//   { fraction: "4/5", percentage: 80 },
//   { fraction: "1/6", percentage: 16.67 },
//   { fraction: "5/6", percentage: 83.33 },
//   { fraction: "1/8", percentage: 12.5 },
//   { fraction: "3/8", percentage: 37.5 },
//   { fraction: "5/8", percentage: 62.5 },
//   { fraction: "7/8", percentage: 87.5 },
//   { fraction: "1/10", percentage: 10 },
//   { fraction: "1/12", percentage: 8.33 },
//   { fraction: "1/16", percentage: 6.25 },
//   { fraction: "1/9", percentage: 11.11 },
//   { fraction: "2/9", percentage: 22.22 },
//   { fraction: "5/9", percentage: 55.56 },
//   { fraction: "7/9", percentage: 77.78 },
//   { fraction: "1/15", percentage: 6.67 },
//   { fraction: "2/15", percentage: 13.33 },
//   { fraction: "4/15", percentage: 26.67 },
//   { fraction: "8/15", percentage: 53.33 },
//   { fraction: "3/10", percentage: 30 },
//   { fraction: "7/10", percentage: 70 },
//   { fraction: "9/10", percentage: 90 },
//   { fraction: "3/12", percentage: 25 }, // Equivalent to 1/4
//   { fraction: "5/12", percentage: 41.67 },
//   { fraction: "7/12", percentage: 58.33 },
//   { fraction: "11/12", percentage: 91.67 },
// ];

// const Quiz = () => {
//   const [question, setQuestion] = useState("");
//   const [correctAnswer, setCorrectAnswer] = useState("");
//   const [userAnswer, setUserAnswer] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     generateQuestion();
//   }, []);

//   const generateQuestion = () => {
//     const isFractionQuestion = Math.random() < 0.5; // 50% chance to ask either

//     if (isFractionQuestion) {
//       const randomFraction =
//         fractions[Math.floor(Math.random() * fractions.length)];
//       setQuestion(
//         `What is the percentage of the fraction ${randomFraction.fraction}?`
//       );
//       setCorrectAnswer(randomFraction.percentage.toString());
//     } else {
//       const randomPercentage = Math.floor(Math.random() * 100) + 1; // Random percentage from 1 to 100
//       const correspondingFraction =
//         fractions.find((f) => f.percentage === randomPercentage) ||
//         fractions[Math.floor(Math.random() * fractions.length)];
//       setQuestion(
//         `What fraction corresponds to ${correspondingFraction.percentage}%?`
//       );
//       setCorrectAnswer(correspondingFraction.fraction);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (userAnswer.trim() === "") {
//       setMessage("Please enter a valid answer.");
//       return;
//     }

//     if (userAnswer.includes("/") && userAnswer.trim() === correctAnswer) {
//       setMessage("Correct!");
//     } else if (parseFloat(userAnswer) === parseFloat(correctAnswer)) {
//       setMessage("Correct!");
//     } else {
//       setMessage(`Wrong! The correct answer was: ${correctAnswer}.`);
//     }

//     setUserAnswer("");
//     setTimeout(() => {
//       setMessage("");
//       generateQuestion();
//     }, 2000);
//   };

//   return (
//     <Box p={4}>
//       <Text fontSize="2xl" mb={4}>
//         {question}
//       </Text>
//       <form onSubmit={handleSubmit}>
//         <Input
//           value={userAnswer}
//           onChange={(e) => setUserAnswer(e.target.value)}
//           placeholder="Enter your answer"
//           mb={4}
//         />
//         <Button type="submit" colorScheme="teal">
//           Submit
//         </Button>
//       </form>
//       {message && (
//         <Text mt={4} fontSize="xl">
//           {message}
//         </Text>
//       )}
//     </Box>
//   );
// };

// export default Quiz;
