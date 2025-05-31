import { useState } from 'react';
import { motion } from 'framer-motion';
import { searchBooks } from '../services/booksApi';
import { speakText } from '../utils/voiceUtils';

const BookSearch = ({ onBookSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);
      speakText(`Found ${results.length} books matching your search`);
    } catch (error) {
      console.error('Search error:', error);
      speakText('Sorry, there was an error searching for books');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books..."
            className="flex-1 input"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSearching}
            className="btn-primary"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </motion.button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card cursor-pointer"
              onClick={() => onBookSelect(book)}
            >
              <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png'}
                  alt={book.volumeInfo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {book.volumeInfo.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {book.volumeInfo.authors?.join(', ')}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {book.volumeInfo.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch; 