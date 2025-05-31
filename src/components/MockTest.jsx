import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { speakText, listenVoice, stopSpeaking, stopListening } from '../utils/voiceUtils';

const MockTest = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [recognition, setRecognition] = useState(null);

  const startListening = () => {
    const newRecognition = listenVoice((transcript) => {
      setUserAnswer(transcript);
      checkAnswer(transcript);
    });
    setRecognition(newRecognition);
    setIsListening(true);
  };

  const checkAnswer = (answer) => {
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();
    const userAnswerLower = answer.toLowerCase();
    
    const isCorrect = userAnswerLower.includes(correctAnswer) || 
                     correctAnswer.includes(userAnswerLower);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      speakText('Correct! Well done!');
      setFeedback('Correct! Well done!');
    } else {
      speakText(`Incorrect. The correct answer is: ${questions[currentQuestion].answer}`);
      setFeedback(`Incorrect. The correct answer is: ${questions[currentQuestion].answer}`);
    }
    
    stopListening(recognition);
    setIsListening(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setFeedback('');
      speakText(questions[currentQuestion + 1].question);
    } else {
      speakText(`Test completed! Your score is ${score} out of ${questions.length}`);
    }
  };

  useEffect(() => {
    speakText(questions[currentQuestion].question);
    return () => {
      stopSpeaking();
      if (recognition) {
        stopListening(recognition);
      }
    };
  }, [currentQuestion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Question {currentQuestion + 1} of {questions.length}</h2>
          <p className="text-lg">{questions[currentQuestion].question}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Your answer:</p>
          <p className="text-lg font-medium">{userAnswer || 'Waiting for your answer...'}</p>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              feedback.includes('Correct') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {feedback}
          </motion.div>
        )}

        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startListening}
            disabled={isListening}
            className={`px-6 py-2 rounded-lg ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {isListening ? 'Listening...' : 'Answer'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!feedback}
            className={`px-6 py-2 rounded-lg ${
              !feedback 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Next Question
          </motion.button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold">
          Score: {score} / {questions.length}
        </p>
      </div>
    </motion.div>
  );
};

export default MockTest;
