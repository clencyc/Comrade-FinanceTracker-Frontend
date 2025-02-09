import { useState } from 'react';
import { Search, Star, Loader } from 'lucide-react';

const BookRecommendations = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');
    setBooks([]);

    try {
      console.log('Sending request with query:', query);
      
      const response = await fetch('http://localhost:8000/api/geminibook/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRFToken': getCsrfToken(), // Add this if you're using Django's CSRF protection
        },
        body: JSON.stringify({ query }),
      });

      const responseText = await response.text();
      console.log('Raw API Response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error(`Failed to parse server response: ${responseText.substring(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.books) {
        throw new Error('Response missing books array');
      }

      console.log('Processed data:', data);
      setBooks(data.books);

    } catch (err) {
      console.error('Search Error:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to get CSRF token from cookies (if using Django's CSRF protection)
  const getCsrfToken = () => {
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div className="max-w-4xl ml-[300px] p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Financial Book Recommendations</h2>
        
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search for financial books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            <div className="font-medium">Error occurred:</div>
            <div className="mt-1">{error}</div>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {books.map((book, index) => (
            <div key={index} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                {book.cover_image && (
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="text-sm text-gray-500 mb-2">Genre: {book.genre}</p>
                {book.description && (
                  <p className="text-sm text-gray-600 mb-2">{book.description}</p>
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className={`text-sm font-medium ${book.difficulty_level === 'Beginner' ? 'text-green-600' : book.difficulty_level === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {book.difficulty_level}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>{Number(book.rating).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && !loading && !error && (
          <div className="text-center text-gray-500 mt-8">
            No books found. Try searching for a different topic.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRecommendations;