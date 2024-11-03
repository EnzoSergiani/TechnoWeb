import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import Book from "../../components/book";
import Sorting from "../../components/sorting";
import { BookInterface, ReviewInterface } from "../../export/interface";
import {
  createBook,
  deleteBookById,
  fetchAllBooks,
  fetchBookById,
} from "../../online/book/book";
import { createReview, fetchReviewsByBookId } from "../../online/review/review";

const BooksIndex: React.FC = () => {
  // interface Book {
  //   id: number;
  //   title: string;
  //   date: string;
  //   author: string;
  //   averageRating: number;
  // }

  //! À supprimer
  // const fakeDB: BookInterface[] = [
  //   {
  //     id: 1,
  //     title: "Le Petit Prince",
  //     date: "1943-04-06",
  //     author: "Antoine de Saint-Exupéry",
  //     averageRating: 4.5,
  //   },
  //   {
  //     id: 2,
  //     title: "Les Misérables",
  //     date: "1862-01-01",
  //     author: "Victor Hugo",
  //     averageRating: 4.8,
  //   },
  //   {
  //     id: 3,
  //     title: "L'Étranger",
  //     date: "1942-05-19",
  //     author: "Albert Camus",
  //     averageRating: 4.2,
  //   },
  //   {
  //     id: 4,
  //     title: "1984",
  //     date: "1949-06-08",
  //     author: "George Orwell",
  //     averageRating: 4.7,
  //   },
  //   {
  //     id: 5,
  //     title: "Le Seigneur des Anneaux",
  //     date: "1954-07-29",
  //     author: "J.R.R. Tolkien",
  //     averageRating: 4.9,
  //   },
  //   {
  //     id: 6,
  //     title: "Harry Potter à l'école des sorciers",
  //     date: "1997-06-26",
  //     author: "J.K. Rowling",
  //     averageRating: 4.6,
  //   },
  //   {
  //     id: 7,
  //     title: "Le Rouge et le Noir",
  //     date: "1830-11-13",
  //     author: "Stendhal",
  //     averageRating: 4.3,
  //   },
  //   {
  //     id: 8,
  //     title: "Les Fleurs du Mal",
  //     date: "1857-06-25",
  //     author: "Charles Baudelaire",
  //     averageRating: 4.1,
  //   },
  // ];

  const [books, setBooks] = useState<BookInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<keyof BookInterface>("title");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", date: "", author: "" });

  const fetchBooks = async () => {
    const books = await fetchAllBooks();
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as keyof BookInterface);
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortOption] ?? "";
      const bValue = b[sortOption] ?? "";
      return aValue > bValue ? 1 : -1;
    });

  return (
    <div id="container" className="w-full min-h-screen bg-gray-200">
      <Header text="Bibliothèque" />
      <div id="body" className="p-10">
        <div className="flex justify-between items-center mb-4">
          <SearchBar onSearch={handleSearch} />
          <Sorting value={sortOption} onChange={handleSort} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center row-gap-8 gap-y-8">
          {filteredBooks.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              date={book.publicationYear}
              author={book.author.name}
              averageRating={book.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksIndex;
