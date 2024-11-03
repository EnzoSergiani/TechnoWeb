import React, { useState } from "react";
import Header from "../../components/header";
import { AuthorInterface } from "../../export/interface";
import {
  createAuthor,
  deleteAuthorById,
  fetchAllAuthors,
  fetchAuthorById,
  updateAuthor,
} from "../../online/author/author";

const AuthorsIndex: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorInterface[]>([]);

  const handleFetchAllAuthors = async () => {
    const response = await fetchAllAuthors();
    console.log("authors:", response);
    setAuthors(response);
  };

  return (
    <div id="container" className="w-full h-screen bg-gray-200">
      <Header text="Auteurs" />
      <div onClick={() => handleFetchAllAuthors()}>Fetch tous les auteurs</div>
      <div
        id="body"
        className="flex flex-row justify-center items-center mt-5 z-10"
      ></div>
    </div>
  );
};

export default AuthorsIndex;
