import React from "react";
import "tailwindcss/tailwind.css";

interface TitleProps {
  text: string;
}

const Header: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="bg-white h-16 shadow-md">
      <h1 id="title" className="text-2xl font-bold text-left text-gray-800 p-4">
        {text}
      </h1>
    </div>
  );
};

export default Header;
