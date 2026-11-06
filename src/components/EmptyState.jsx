const EmptyState = ({ isSearching }) => (
  <div className="empty-state card">
    <h3>{isSearching ? "No matching students" : "No students yet"}</h3>
    <p>
      {isSearching
        ? "Try a different name, email, roll number, or course."
        : "Add your first student using the form above to get started."}
    </p>
  </div>
);

export default EmptyState;
