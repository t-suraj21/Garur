import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { voiceControl } from '../utils/voiceControl';

const VoiceControl = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    voiceControl.initialize();
    
    // Update component state based on voice control status
    const updateStatus = () => {
      setIsActive(voiceControl.isListening);
      setIsListening(voiceControl.isListening);
    };

    // Add event listeners for status updates
    voiceControl.onStatusChange = updateStatus;

    return () => {
      voiceControl.onStatusChange = null;
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-white rounded-full shadow-lg p-4 mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-500' : 'bg-gray-400'}`} />
                {isListening && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {isListening ? 'Listening...' : 'Voice Control Active'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isActive) {
            voiceControl.stopListening();
          } else {
            voiceControl.startListening();
          }
        }}
        className={`rounded-full p-4 shadow-lg ${
          isActive ? 'bg-primary-500' : 'bg-gray-200'
        }`}
      >
        <svg
          className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default VoiceControl;
