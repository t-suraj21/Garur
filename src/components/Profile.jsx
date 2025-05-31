import { useState } from 'react';
import { motion } from 'framer-motion';
import { speakText } from '../utils/voiceUtils';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '👤',
    grade: '10th Grade',
    school: 'Delhi Public School',
    joinDate: 'January 2024',
    stats: {
      booksRead: 12,
      testsCompleted: 8,
      averageScore: 85,
      timeSpent: '24h 30m',
      streak: 15,
      points: 1250
    },
    achievements: [
      { id: 1, title: 'Bookworm', description: 'Read 10 books', icon: '📚', progress: 100 },
      { id: 2, title: 'Perfect Score', description: 'Score 100% in a test', icon: '🎯', progress: 100 },
      { id: 3, title: 'Consistent Learner', description: '7-day learning streak', icon: '🔥', progress: 100 },
      { id: 4, title: 'Quick Learner', description: 'Complete 5 chapters in one day', icon: '⚡', progress: 75 },
      { id: 5, title: 'Math Genius', description: 'Master all math concepts', icon: '🧮', progress: 60 },
      { id: 6, title: 'Science Explorer', description: 'Complete all science experiments', icon: '🔬', progress: 40 }
    ],
    recentActivity: [
      { id: 1, type: 'book', title: 'Mathematics Class 10', action: 'Completed Chapter 5', time: '2 hours ago' },
      { id: 2, type: 'test', title: 'Science Test', action: 'Scored 92%', time: 'Yesterday' },
      { id: 3, type: 'achievement', title: 'Bookworm', action: 'Earned new achievement', time: '2 days ago' }
    ]
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    speakText(`Switching to ${tab} tab`);
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

  const AchievementCard = ({ achievement }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{achievement.icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: `${achievement.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{achievement.progress}% Complete</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ActivityCard = ({ activity }) => (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <div className="text-2xl">
        {activity.type === 'book' ? '📚' : activity.type === 'test' ? '📝' : '🏆'}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{activity.title}</h4>
        <p className="text-sm text-gray-600">{activity.action}</p>
      </div>
      <span className="text-sm text-gray-500">{activity.time}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary-500 flex items-center justify-center text-4xl text-white">
              {userData.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600 mt-1">{userData.email}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{userData.grade}</span>
                <span>•</span>
                <span>{userData.school}</span>
                <span>•</span>
                <span>Member since {userData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Books Read"
            value={userData.stats.booksRead}
            icon="📚"
            color="text-blue-500"
          />
          <StatCard
            title="Tests Completed"
            value={userData.stats.testsCompleted}
            icon="📝"
            color="text-green-500"
          />
          <StatCard
            title="Average Score"
            value={`${userData.stats.averageScore}%`}
            icon="🎯"
            color="text-purple-500"
          />
          <StatCard
            title="Time Spent"
            value={userData.stats.timeSpent}
            icon="⏱️"
            color="text-orange-500"
          />
          <StatCard
            title="Current Streak"
            value={`${userData.stats.streak} days`}
            icon="🔥"
            color="text-red-500"
          />
          <StatCard
            title="Total Points"
            value={userData.stats.points}
            icon="⭐"
            color="text-yellow-500"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['overview', 'achievements', 'activity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Learning Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userData.achievements.slice(0, 4).map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">All Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userData.achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 