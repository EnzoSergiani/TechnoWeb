import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BooksIndex from "./pages/books/books_index";
import BookDetail from "./pages/books/books_details";
import AuthorsIndex from "./pages/authors/authors_index";
import AuthorDetails from "./pages/authors/authors_details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="books" element={<BooksIndex />} />
          <Route path="books/:bookId" element={<BookDetail />} />
          <Route path="author" element={<AuthorsIndex />} />
          <Route path="author/:authorId" element={<AuthorDetails />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
