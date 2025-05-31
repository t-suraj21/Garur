const API_KEY = 'AIzaSyCNk9tzPuYdptGt0xXWiY5DB1ti1u58vmk';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

export const getNCERTBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}?q=ncert+textbook&key=${API_KEY}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching NCERT books:', error);
    return [];
  }
};

export const getBookDetails = async (bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/${bookId}?key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
}; 