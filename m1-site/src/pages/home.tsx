import React from "react";
import Header from "../components/header";
import Section from "../components/section";
import { ReactComponent as IconBook } from "../assets/svg/book-solid.svg";
import { ReactComponent as IconAuthor } from "../assets/svg/pen-nib-solid.svg";

const Home: React.FC = () => {
  return (
    <div id="container" className="w-full h-screen bg-gray-200">
      <Header text="Accueil" />
      <div id="body" className="flex flex-row justify-center items-center mt-5">
        <Section
          title="Liste des livres"
          svg={<IconBook width={100} />}
          text="Accédez à la liste de tous vos livres."
          redirection="books"
        />
        <Section
          title="Liste des auteurs"
          svg={<IconAuthor width={100} />}
          text="Accédez à la liste de tous les auteurs."
          redirection="authors"
        />
      </div>
    </div>
  );
};

export default Home;
