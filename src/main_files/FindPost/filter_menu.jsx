import { useState } from "react";
import "./../../css/filter.css";

export function FilterMenu({ setFilter }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [date, setDate] = useState("");

  const handleFilter = () => {
    console.log(tag);
    setFilter({
      title,
      tag,
      date,
    });
  };

  const options = [
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "Express", label: "Express" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Firebase", label: "Firebase" },
  ];

  return (
    <div className="filter-menu">
      <h3>Filter Menu</h3>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by title...."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <select
          name="tag"
          onChange={(e) => {
            setTag(e.target.value);
          }}
          value={tag}
        >
          <option value="">All Tags</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value.toString());
          }}
        />
      </div>

      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
}
