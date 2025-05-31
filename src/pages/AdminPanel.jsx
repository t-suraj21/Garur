import { useState } from 'react';
import { motion } from 'framer-motion';
import { speakText } from '../utils/voiceUtils';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    chapter: '',
    title: '',
    content: '',
    question: '',
    answer: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call to save the content
    speakText('Content saved successfully');
    setFormData({
      class: '',
      subject: '',
      chapter: '',
      title: '',
      content: '',
      question: '',
      answer: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const tabs = [
    { id: 'content', label: 'Add Content' },
    { id: 'questions', label: 'Add Questions' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>

        <div className="flex border-b mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary-500 text-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select Class</option>
                {[5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>Class {num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select Subject</option>
                {['science', 'math', 'english', 'hindi'].map(subject => (
                  <option key={subject} value={subject}>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter
              </label>
              <input
                type="number"
                name="chapter"
                value={formData.chapter}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                min="1"
                required
              />
            </div>
          </div>

          {activeTab === 'content' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Save {activeTab === 'content' ? 'Content' : 'Question'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
