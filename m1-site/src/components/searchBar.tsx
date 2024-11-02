import React, { useState } from "react";
import { ReactComponent as IconSearch } from "../assets/svg/magnifying-glass-solid.svg";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative flex items-center rounded-lg p-2 border">
      <IconSearch className="absolute w-4 h-4 left-6" fill="gray" />
      <input
        type="text"
        placeholder="Rechercher par titre"
        value={searchTerm}
        onChange={handleSearch}
        className="flex-grow p-2 pl-10 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
