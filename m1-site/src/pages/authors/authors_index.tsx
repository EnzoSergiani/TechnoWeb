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

  const handleCreateAuthor = async (
    authorData: Omit<AuthorInterface, "id">
  ) => {
    const author = await createAuthor(authorData);
    console.log(author);
  };

  const authorDataTest = {
    name: "David Loutre",
    description: "David est le fils de Momone",
    profilePicture: "unpetitsourire.jpg",
  };

  return (
    <div id="container" className="w-full h-screen bg-gray-200">
      <Header text="Auteurs" />
      <div onClick={() => handleFetchAllAuthors()}>Fetch tous les auteurs</div>
      <div onClick={() => handleCreateAuthor(authorDataTest)}>
        Create un author
      </div>
      <div
        id="body"
        className="flex flex-row justify-center items-center mt-5 z-10"
      ></div>
    </div>
  );
};

export default AuthorsIndex;
