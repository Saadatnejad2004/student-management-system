const SearchBar = ({ value, onChange, resultCount }) => (
  <div className="search-bar">
    <input
      type="search"
      className="input"
      placeholder="Search by name, email, roll no, or course…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search students"
    />
    <span className="search-count">
      {resultCount} {resultCount === 1 ? "student" : "students"}
    </span>
  </div>
);

export default SearchBar;
