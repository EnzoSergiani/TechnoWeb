import React from "react";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  title: string;
  svg: React.ReactNode;
  text: string;
  redirection: string;
}

const Section: React.FC<SectionProps> = ({ title, svg, text, redirection }) => {
  const navigate = useNavigate();
  return (
    <div
      id="container"
      className="w-72 h-50 bg-white flex flex-col items-center justify-center rounded-lg m-3.5 p-5 cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md"
      onClick={() => navigate(redirection)}
    >
      <div id="title" className="mb-4 text-xl font-bold fixed top-0 mt-5">
        {title}
      </div>
      <div id="svg" className="mb-4 top-0 mt-12 h-28">
        {svg}
      </div>
      <div
        id="text"
        className="text-center text-gray-500 italic text-sm break-words top-0 mt-30"
      >
        {text}
      </div>
    </div>
  );
};

export default Section;
