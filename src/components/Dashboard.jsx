import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { speakText } from '../utils/voiceUtils';
import BookChapters from './BookChapters';
import BookReader from './BookReader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    booksRead: 12,
    testsCompleted: 8,
    averageScore: 85,
    timeSpent: '24h 30m'
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'book',
      title: 'Mathematics Class 10',
      action: 'Completed Chapter 5',
      time: '2 hours ago',
      icon: '📚'
    },
    {
      id: 2,
      type: 'test',
      title: 'Science Test',
      action: 'Scored 92%',
      time: 'Yesterday',
      icon: '📝'
    },
    {
      id: 3,
      type: 'book',
      title: 'English Literature',
      action: 'Started Chapter 3',
      time: '2 days ago',
      icon: '📚'
    }
  ]);

  const [quickAccess, setQuickAccess] = useState([
    {
      id: 1,
      title: 'Continue Reading',
      book: 'Mathematics Class 10',
      chapter: 'Chapter 5: Trigonometry',
      progress: 75,
      icon: '📖'
    },
    {
      id: 2,
      title: 'Upcoming Test',
      subject: 'Science',
      date: 'Tomorrow, 10:00 AM',
      icon: '⏰'
    },
    {
      id: 3,
      title: 'Recommended Books',
      description: 'Based on your interests',
      icon: '📚'
    }
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    speakText('Welcome to your dashboard');
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    speakText(`Opening ${book.title}`);
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setIsReading(true);
    speakText(`Starting chapter ${chapter.title}`);
  };

  const handleBack = () => {
    if (isReading) {
      setIsReading(false);
      setSelectedChapter(null);
    } else {
      setSelectedBook(null);
    }
    speakText('Returning to previous view');
  };

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`text-3xl ${color}`}>{icon}</div>
      </div>
    </motion.div>
  );

  const ActivityCard = ({ activity }) => (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <div className="text-2xl">{activity.icon}</div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{activity.title}</h4>
        <p className="text-sm text-gray-600">{activity.action}</p>
      </div>
      <span className="text-sm text-gray-500">{activity.time}</span>
    </motion.div>
  );

  const QuickAccessCard = ({ item }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer"
      onClick={() => item.book && handleBookSelect({ title: item.book, author: 'NCERT' })}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{item.icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{item.title}</h4>
          {item.book && (
            <>
              <p className="text-sm text-gray-600 mt-1">{item.book}</p>
              <p className="text-sm text-gray-500">{item.chapter}</p>
              {item.progress && (
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-primary-500 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.progress}% complete</p>
                </div>
              )}
            </>
          )}
          {item.subject && (
            <>
              <p className="text-sm text-gray-600 mt-1">{item.subject}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </>
          )}
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (isReading && selectedChapter) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBack}
            className="mb-6 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Chapters
          </motion.button>
          <BookReader
            content={`Content for ${selectedChapter.title}`}
            title={selectedChapter.title}
          />
        </div>
      </div>
    );
  }

  if (selectedBook) {
    return (
      <BookChapters
        book={selectedBook}
        onChapterSelect={handleChapterSelect}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your learning progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Books Read"
            value={stats.booksRead}
            icon="📚"
            color="text-blue-500"
          />
          <StatCard
            title="Tests Completed"
            value={stats.testsCompleted}
            icon="📝"
            color="text-green-500"
          />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon="🎯"
            color="text-purple-500"
          />
          <StatCard
            title="Time Spent"
            value={stats.timeSpent}
            icon="⏱️"
            color="text-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
                <Link to="/activities" className="text-primary-500 hover:text-primary-600">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Access</h2>
              <div className="space-y-4">
                {quickAccess.map((item) => (
                  <QuickAccessCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleBookSelect({ title: 'Mathematics Class 10', author: 'NCERT' })}
            className="bg-primary-500 text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📚</span>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Start Reading</h3>
                <p className="text-sm opacity-90">Continue your learning journey</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-green-500 text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📝</span>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Take a Test</h3>
                <p className="text-sm opacity-90">Test your knowledge</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-purple-500 text-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📊</span>
              <div className="text-left">
                <h3 className="font-semibold text-lg">View Progress</h3>
                <p className="text-sm opacity-90">Track your learning</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
