import React from "react";

interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sorting: React.FC<SelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 bg-white rounded shadow"
    >
      <option value="title">Titre</option>
      <option value="date">Date</option>
      <option value="author">Auteur</option>
    </select>
  );
};

export default Sorting;
