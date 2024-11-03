import React from "react";
import "tailwindcss/tailwind.css";
import { ReactComponent as IconHouse } from "../assets/svg/house-solid.svg";
import { useNavigate } from "react-router-dom";

interface TitleProps {
  text: string;
}

const Header: React.FC<TitleProps> = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-16 shadow-md">
      <IconHouse
        className="w-8 h-8 mx-4 my-4 float-left"
        onClick={() => {
          navigate("/");
        }}
      />
      <h1 id="title" className="text-2xl font-bold text-left text-gray-800 p-4">
        {text}
      </h1>
    </div>
  );
};

export default Header;
