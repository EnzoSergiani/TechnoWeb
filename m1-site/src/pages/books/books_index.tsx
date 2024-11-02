import React from "react";
import Header from "../../components/header";

const BooksIndex: React.FC = () => {
  return (
    <div id="container" className="w-full h-screen bg-gray-200">
      <Header text="Bibliothèque" />
      <div
        id="body"
        className="flex flex-row justify-center items-center mt-5"
      ></div>
    </div>
  );
};

export default BooksIndex;
