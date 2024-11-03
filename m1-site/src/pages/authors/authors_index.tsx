import React from "react";
import Header from "../../components/header";

const AuthorsIndex: React.FC = () => {
  return (
    <div id="container" className="w-full h-screen bg-gray-200">
      <Header text="Auteurs" />
      <div
        id="body"
        className="flex flex-row justify-center items-center mt-5 z-10"
      ></div>
    </div>
  );
};

export default AuthorsIndex;
