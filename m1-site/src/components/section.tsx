import React from "react";

interface SectionProps {
  title: string;
  svg: React.ReactNode;
  text: string;
  redirection: string;
}

const Section: React.FC<SectionProps> = ({ title, svg, text, redirection }) => {
  return (
    <div
      id="container"
      className="w-72 bg-white flex flex-col items-center justify-center rounded-lg m-3.5 p-5 cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={() => (window.location.href = redirection)}
    >
      <div id="title" className="mb-4 text-xl font-bold">
        {title}
      </div>
      <div id="svg" className="mb-4">
        {svg}
      </div>
      <div
        id="text"
        className="text-center text-gray-500 italic text-sm break-words"
      >
        {text}
      </div>
    </div>
  );
};

export default Section;
