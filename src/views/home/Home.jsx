import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constant/data";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/book/all`);
        setBooks(response.data.data);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Available Books</h2>

      {loading && <p className="text-lg text-gray-700">Loading books...</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {book.title}
            </h3>
            <p className="text-gray-700">Author: {book.author}</p>
            <p className="text-gray-600">Published: {book.publishedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
