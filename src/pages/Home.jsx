import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { speakText } from '../utils/voiceUtils';

const Home = () => {
  const features = [
    {
      title: 'Library',
      description: 'Access your study materials and books',
      icon: '📚',
      path: '/library',
      command: 'Go to library'
    },
    {
      title: 'Mock Tests',
      description: 'Practice with voice-based tests',
      icon: '✍️',
      path: '/tests',
      command: 'Start test'
    }
  ];

  const handleFeatureClick = (feature) => {
    speakText(`Opening ${feature.title}. ${feature.description}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="text-center mb-12">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          Welcome to Garur
        </motion.h1>
        <motion.p
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-xl text-gray-600"
        >
          Your voice-controlled learning companion
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={feature.path}
              onClick={() => handleFeatureClick(feature)}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
                <p className="mt-4 text-sm text-primary-500">
                  Voice command: "{feature.command}"
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-600">
          Use voice commands to navigate and interact with the application.
          <br />
          Click the microphone icon in the bottom right to start.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Home;
