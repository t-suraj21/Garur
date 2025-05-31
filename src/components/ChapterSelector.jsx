import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { speakText, listenVoice, stopListening } from '../utils/voiceUtils';
import { fetchChapters } from '../services/api';

const ChapterSelector = ({ onSelect, subjects, classes, onClassSelect }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [chapters, setChapters] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      const loadChapters = async () => {
        try {
          setLoading(true);
          const chaptersData = await fetchChapters(selectedClass, selectedSubject);
          setChapters(chaptersData);
        } catch (error) {
          console.error('Error loading chapters:', error);
        } finally {
          setLoading(false);
        }
      };
      loadChapters();
    }
  }, [selectedClass, selectedSubject]);

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    setSelectedSubject('');
    setSelectedChapter('');
    onClassSelect(classId);
  };

  const handleVoiceSelect = () => {
    speakText('Please say the class, subject, and chapter number. For example: Class 5 Science Chapter 2');
    
    const newRecognition = listenVoice((transcript) => {
      const command = transcript.toLowerCase();
      
      // Parse class
      const classMatch = command.match(/class\s+(\d+)/i);
      if (classMatch) {
        handleClassChange(classMatch[1]);
      }
      
      // Parse subject
      const subjectMatch = command.match(/(science|math|english|hindi)/i);
      if (subjectMatch) {
        setSelectedSubject(subjectMatch[1]);
      }
      
      // Parse chapter
      const chapterMatch = command.match(/chapter\s+(\d+)/i);
      if (chapterMatch) {
        setSelectedChapter(chapterMatch[1]);
      }
      
      if (classMatch && subjectMatch && chapterMatch) {
        onSelect({
          class: classMatch[1],
          subject: subjectMatch[1],
          chapter: chapterMatch[1]
        });
      }
      
      stopListening(recognition);
      setIsListening(false);
    });
    
    setRecognition(newRecognition);
    setIsListening(true);
  };

  const handleManualSelect = () => {
    if (selectedClass && selectedSubject && selectedChapter) {
      onSelect({
        class: selectedClass,
        subject: selectedSubject,
        chapter: selectedChapter
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Chapter</h2>
        
        <div className="space-y-6">
          {/* Class Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  Class {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              disabled={!selectedClass}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chapter
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              disabled={!selectedSubject || loading}
            >
              <option value="">Select Chapter</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  Chapter {chapter.number}: {chapter.title}
                </option>
              ))}
            </select>
            {loading && (
              <div className="mt-2 text-sm text-gray-500">
                Loading chapters...
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleManualSelect}
              disabled={!selectedClass || !selectedSubject || !selectedChapter}
              className={`px-6 py-2 rounded-lg ${
                !selectedClass || !selectedSubject || !selectedChapter
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              Select Chapter
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceSelect}
              disabled={isListening}
              className={`px-6 py-2 rounded-lg ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {isListening ? 'Listening...' : 'Voice Select'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterSelector;
