import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constant/data";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all books initially
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/book/all`);
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search request to the backend
  const handleSearch = async () => {
    if (searchInput.trim() === "") {
      // If search is empty, fetch all books
      fetchBooks();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/book/search`, {
        params: { input: searchInput }, //input: searchInput,
      });
      console.log("🚀 ~ handleSearch ~ response:", response);
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error searching for books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Available Books
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by title, author, or category..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length === 0 && !loading ? (
          <p className="text-center col-span-full text-gray-600">
            No books found.
          </p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-500">
                Published:
                {book.createdAt
                  ? new Date(book.createdAt).toLocaleDateString()
                  : "Not Available"}
              </p>
              <p className="text-gray-500">
                Category: {book.category.join(", ")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
