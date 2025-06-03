import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { speakText } from '../utils/voiceUtils';
import Navbar from '../components/Navbar';
import VoiceControl from '../components/VoiceControl';

const Home = () => {
  useEffect(() => {
    // Welcome message when component mounts
    speakText('Welcome to Garur, your voice-enabled learning platform');
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'Personalized Learning',
      description: 'Adaptive tests and lessons tailored to your learning style'
    },
    {
      icon: '🎤',
      title: 'Voice Control',
      description: 'Hands-free navigation and interaction throughout the platform'
    },
    {
      icon: '📚',
      title: 'Rich Content Library',
      description: 'Access to a vast collection of educational materials'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <VoiceControl />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
            >
              Learn Smarter with
              <span className="text-primary-500"> Voice</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto"
            >
              Experience the future of education with our voice-enabled learning platform.
              Study, test, and track your progress—all with the power of your voice.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex justify-center space-x-4"
            >
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 transition-colors duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors duration-300"
              >
                Try Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-primary-500 rounded-2xl p-8 sm:p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-primary-50 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already learning smarter with voice technology.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              Start Learning Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
