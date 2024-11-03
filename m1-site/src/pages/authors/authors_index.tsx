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

  const handleFetchAuthorById = async (id: number) => {
    const author = await fetchAuthorById(id);
    console.log(author);
  };

  const handleCreateAuthor = async (
    authorData: Omit<AuthorInterface, "id">
  ) => {
    const newAuthor = await createAuthor(authorData);
    console.log("Author fraichement créé:", newAuthor);
  };

  const handleUpdateAuthor = async (authorData: AuthorInterface) => {
    const updatedAuthor = await updateAuthor(authorData);
    console.log("Updated author:", updatedAuthor);
  };

  const handleDeleteAuthor = async (id: number) => {
    const response = await deleteAuthorById(id);
    console.log(response);
  };

  return (
    <div id="container" className="w-full h-screen bg-gray-200">
      <Header text="Auteurs" />
      <div onClick={() => handleFetchAllAuthors()}>Fetch tous les auteurs</div>
      <div onClick={() => handleFetchAuthorById(1)}>Fetch auteur id 0</div>
      <div
        onClick={() =>
          handleCreateAuthor({
            name: "David Loutre",
            profilePicture: "aupif.jpg",
          })
        }
      >
        Créer un auteur
      </div>
      <div
        onClick={() =>
          handleUpdateAuthor({
            id: 3,
            name: "David Loutre Mais en plus beau",
            profilePicture: "aupif2.jpg",
          })
        }
      >
        Update un auteur
      </div>
      <div onClick={() => handleDeleteAuthor(3)}>Supprimer David Loutre</div>
      <div
        id="body"
        className="flex flex-row justify-center items-center mt-5 z-10"
      ></div>
    </div>
  );
};

export default AuthorsIndex;
