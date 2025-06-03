import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MockTest from '../components/MockTest';
import ChapterSelector from '../components/ChapterSelector';
import { speakText } from '../utils/voiceUtils';
import { fetchClasses, fetchSubjects, fetchTestQuestions } from '../services/api';
import Navbar from '../components/Navbar';

// Sample demo data
const DEMO_DATA = {
  classes: [
    { id: 1, name: 'Class 10' },
    { id: 2, name: 'Class 11' },
    { id: 3, name: 'Class 12' }
  ],
  subjects: [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' }
  ],
  questions: [
    {
      id: 1,
      question: 'What is the value of π (pi) to two decimal places?',
      options: ['3.14', '3.16', '3.12', '3.18'],
      correctAnswer: '3.14'
    },
    {
      id: 2,
      question: 'What is the formula for the area of a circle?',
      options: ['πr²', '2πr', 'πd', '2πr²'],
      correctAnswer: 'πr²'
    },
    {
      id: 3,
      question: 'If x = 5, what is 2x + 3?',
      options: ['13', '8', '10', '15'],
      correctAnswer: '13'
    }
  ]
};

const TestPage = ({ isDemo = false }) => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (isDemo) {
          setClasses(DEMO_DATA.classes);
          setSubjects(DEMO_DATA.subjects);
          setLoading(false);
        } else {
          const classesData = await fetchClasses();
          setClasses(classesData);
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load classes');
        setLoading(false);
      }
    };

    loadInitialData();
  }, [isDemo]);

  const handleClassSelect = async (classId) => {
    try {
      if (isDemo) {
        setSubjects(DEMO_DATA.subjects);
      } else {
        const subjectsData = await fetchSubjects(classId);
        setSubjects(subjectsData);
      }
    } catch (err) {
      setError('Failed to load subjects');
    }
  };

  const handleTestSelect = async (selection) => {
    try {
      setLoading(true);
      if (isDemo) {
        setSelectedTest(DEMO_DATA.questions);
        setIsTestStarted(true);
        speakText(`Starting demo test for ${selection.subject}`);
      } else {
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
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-6 pt-24"
      >
        {!isTestStarted ? (
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold mb-4">
                {isDemo ? 'Demo Test' : 'Mock Test'}
              </h1>
              <p className="text-gray-600">
                {isDemo 
                  ? 'Try our voice-based test demo to experience our platform'
                  : 'Select a subject and chapter to start your voice-based test'}
              </p>
            </motion.div>

            <ChapterSelector
              onSelect={handleTestSelect}
              subjects={subjects}
              classes={classes}
              onClassSelect={handleClassSelect}
              isDemo={isDemo}
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
            
            <MockTest questions={selectedTest} isDemo={isDemo} />
          </div>
        )}
      </motion.div>
    </>
  );
};

export default TestPage;
