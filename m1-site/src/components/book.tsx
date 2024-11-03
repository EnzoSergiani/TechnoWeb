import React from "react";
import imgPath from "../assets/images/book.jpeg";
import { useNavigate } from "react-router-dom";

interface BookProps {
  id: number;
  title: string;
  date: string;
  author: string;
  averageRating: number;
}

const Book: React.FC<BookProps> = ({
  id,
  title,
  date,
  author,
  averageRating,
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      className="p-4 bg-white rounded w-72 h-100 cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md"
      onClick={() => navigate("/books/" + id)}
    >
      <h2 className="text-xl font-bold text-center pb-10 break-words max-h-16 overflow-hidden">
        {title}
      </h2>
      <div className="flex justify-center">
        <img src={imgPath} alt="" width={180} />
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <p className="font-semibold">Date :</p>
          <p>{date}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Auteur :</p>
          <p>{author}</p>
        </div>
        <div className="flex justify-between ">
          <p className="font-semibold">Note moyenne :</p>
          <p>{averageRating}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
