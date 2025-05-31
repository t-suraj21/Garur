import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { speakText, stopSpeaking } from '../utils/voiceUtils';

const BookReader = ({ content, title, onNext, onPrevious }) => {
  const [isReading, setIsReading] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const paragraphs = content.split('\n\n').filter(p => p.trim());

  const readCurrentParagraph = () => {
    if (paragraphs[currentParagraph]) {
      speakText(paragraphs[currentParagraph]);
      setIsReading(true);
    }
  };

  const handleNext = () => {
    stopSpeaking();
    if (currentParagraph < paragraphs.length - 1) {
      setCurrentParagraph(prev => prev + 1);
    } else if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    stopSpeaking();
    if (currentParagraph > 0) {
      setCurrentParagraph(prev => prev - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const handleRepeat = () => {
    stopSpeaking();
    readCurrentParagraph();
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <p className="text-lg leading-relaxed">
          {paragraphs[currentParagraph]}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRepeat}
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          {isReading ? 'Stop' : 'Read'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Next
        </motion.button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Paragraph {currentParagraph + 1} of {paragraphs.length}
      </div>
    </motion.div>
  );
};

export default BookReader;
