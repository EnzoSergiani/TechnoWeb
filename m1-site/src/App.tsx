import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BooksIndex from "./pages/books/books_index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksIndex />} />
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
