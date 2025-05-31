import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speakText } from '../utils/voiceUtils';

const BookChapters = ({ book, onChapterSelect, onBack }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isReading, setIsReading] = useState(false);

  // Mock chapters data - replace with actual API call
  const chapters = [
    { id: 1, title: 'Introduction to Mathematics', progress: 100 },
    { id: 2, title: 'Number Systems', progress: 75 },
    { id: 3, title: 'Algebra', progress: 50 },
    { id: 4, title: 'Geometry', progress: 25 },
    { id: 5, title: 'Trigonometry', progress: 0 },
    { id: 6, title: 'Statistics', progress: 0 },
    { id: 7, title: 'Probability', progress: 0 },
    { id: 8, title: 'Coordinate Geometry', progress: 0 },
  ];

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setIsReading(true);
    speakText(`Opening chapter ${chapter.title}`);
    onChapterSelect(chapter);
  };

  const handleBack = () => {
    setIsReading(false);
    setSelectedChapter(null);
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Book Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
                <p className="text-gray-600 mt-1">{book.author}</p>
              </div>
            </div>
          </div>

          {/* Chapters List */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Chapters</h2>
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <motion.div
                  key={chapter.id}
                  whileHover={{ x: 5 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors"
                  onClick={() => handleChapterClick(chapter)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{chapter.title}</h3>
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full w-48">
                          <div
                            className="h-2 bg-primary-500 rounded-full"
                            style={{ width: `${chapter.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {chapter.progress}% Complete
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {chapter.progress === 100 && (
                        <span className="text-green-500">✓</span>
                      )}
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Book Info */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">About this Book</h3>
            <p className="text-gray-600 text-sm">
              {book.description || 'A comprehensive guide to mathematics covering all essential topics from basic concepts to advanced applications.'}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span>📚</span>
                <span>{chapters.length} Chapters</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>Estimated 40 hours</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🎯</span>
                <span>All Levels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookChapters; 