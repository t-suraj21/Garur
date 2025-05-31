import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookSearch from '../components/BookSearch';
import BookReader from '../components/BookReader';
import { speakText } from '../utils/voiceUtils';
import { getNCERTBooks, getBookDetails } from '../services/booksApi';

const Library = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [ncertBooks, setNcertBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadNCERTBooks = async () => {
      try {
        const books = await getNCERTBooks();
        setNcertBooks(books);
        setLoading(false);
      } catch (err) {
        setError('Failed to load NCERT books');
        setLoading(false);
      }
    };

    loadNCERTBooks();
  }, []);

  const handleBookSelect = async (book) => {
    try {
      setLoading(true);
      const bookDetails = await getBookDetails(book.id);
      if (bookDetails) {
        setSelectedBook(bookDetails);
        setIsReading(true);
        speakText(`Opening ${bookDetails.volumeInfo.title}`);
      } else {
        setError('Failed to load book details');
      }
    } catch (err) {
      setError('Failed to load book details');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsReading(false);
    setSelectedBook(null);
    speakText('Returning to book selection');
  };

  const categories = [
    { id: 'all', label: 'All Books' },
    { id: 'science', label: 'Science' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'social', label: 'Social Studies' },
    { id: 'english', label: 'English' }
  ];

  const filteredBooks = selectedCategory === 'all' 
    ? ncertBooks 
    : ncertBooks.filter(book => 
        book.volumeInfo.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-xl font-semibold mb-4 text-gray-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-3 text-lg"
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
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isReading ? (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Library</h1>
                <p className="text-gray-600">Explore our collection of NCERT books and more</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSearch(!showSearch)}
                className="btn-primary px-6 py-3 text-lg shadow-lg"
              >
                {showSearch ? 'Show NCERT Books' : 'Search Books'}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {showSearch ? (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <BookSearch onBookSelect={handleBookSelect} />
                </motion.div>
              ) : (
                <motion.div
                  key="books"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-4">
                      {categories.map((category) => (
                        <motion.button
                          key={category.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                            selectedCategory === category.id
                              ? 'bg-primary-500 text-white shadow-md'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:shadow-xl"
                        onClick={() => handleBookSelect(book)}
                      >
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png'}
                            alt={book.volumeInfo.title}
                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
                            {book.volumeInfo.title}
                          </h3>
                          <p className="text-sm text-primary-600 mb-2">
                            {book.volumeInfo.authors?.join(', ')}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {book.volumeInfo.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleBack}
              className="mb-6 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Library
            </motion.button>
            
            <BookReader
              content={selectedBook.volumeInfo.description || 'No content available'}
              title={selectedBook.volumeInfo.title}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Library;
