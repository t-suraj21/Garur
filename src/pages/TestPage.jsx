import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MockTest from '../components/MockTest';
import ChapterSelector from '../components/ChapterSelector';
import { speakText } from '../utils/voiceUtils';
import { fetchClasses, fetchSubjects, fetchTestQuestions } from '../services/api';

const TestPage = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const classesData = await fetchClasses();
        setClasses(classesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load classes');
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleClassSelect = async (classId) => {
    try {
      const subjectsData = await fetchSubjects(classId);
      setSubjects(subjectsData);
    } catch (err) {
      setError('Failed to load subjects');
    }
  };

  const handleTestSelect = async (selection) => {
    try {
      setLoading(true);
      const questions = await fetchTestQuestions(
        selection.class,
        selection.subject,
        selection.chapter
      );
      
      if (questions && questions.length > 0) {
        setSelectedTest(questions);
        setIsTestStarted(true);
        speakText(`Starting ${selection.subject} test for class ${selection.class}, chapter ${selection.chapter}`);
      } else {
        setError('No questions available for this chapter');
      }
    } catch (err) {
      setError('Failed to load test questions');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsTestStarted(false);
    setSelectedTest(null);
    speakText('Returning to test selection');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      {!isTestStarted ? (
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-4">Mock Test</h1>
            <p className="text-gray-600">
              Select a subject and chapter to start your voice-based test
            </p>
          </motion.div>

          <ChapterSelector
            onSelect={handleTestSelect}
            subjects={subjects}
            classes={classes}
            onClassSelect={handleClassSelect}
          />
        </div>
      ) : (
        <div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBack}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ← Back to Selection
          </motion.button>
          
          <MockTest questions={selectedTest} />
        </div>
      )}
    </motion.div>
  );
};

export default TestPage;
