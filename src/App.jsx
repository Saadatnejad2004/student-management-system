import { useMemo, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import SearchBar from "./components/SearchBar";
import ConfirmDialog from "./components/ConfirmDialog";
import { useStudents } from "./hooks/useStudents";

const App = () => {
  const {
    students,
    form,
    errors,
    editingId,
    feedback,
    handleFieldChange,
    handleSubmit,
    startEdit,
    cancelEdit,
    deleteStudent,
  } = useStudents();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [pendingDelete, setPendingDelete] = useState(null); // student awaiting confirmation

  const visibleStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const filtered = term
      ? students.filter((s) =>
          [s.name, s.email, s.rollNo, s.course].some((field) =>
            field.toLowerCase().includes(term)
          )
        )
      : students;

    const sorted = [...filtered]; // COPY — .sort() mutates the original array!
    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "roll":
        sorted.sort((a, b) => a.rollNo.localeCompare(b.rollNo));
        break;
      case "year-asc":
        sorted.sort((a, b) => a.year - b.year);
        break;
      case "year-desc":
        sorted.sort((a, b) => b.year - a.year);
        break;
      default:
        break; // "newest" — array is already newest-first from prepend
    }
    return sorted;
  }, [students, searchTerm, sortBy]);

  const confirmDelete = () => {
    if (pendingDelete) deleteStudent(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Student Management System</h1>
        <p className="subtitle">Add, edit, search, and remove student records.</p>
      </header>

      <main className="app-main">
        <StudentForm
          form={form}
          errors={errors}
          editingId={editingId}
          onChange={handleFieldChange}
          onSubmit={handleSubmit}
          onCancel={cancelEdit}
        />

        <section className="list-section">
          <div className="list-toolbar">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              resultCount={visibleStudents.length}
            />
            <select
              className="input sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort students"
            >
              <option value="newest">Newest first</option>
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="roll">Roll number</option>
              <option value="year-asc">Year (1 → 6)</option>
              <option value="year-desc">Year (6 → 1)</option>
            </select>
          </div>

          <StudentTable
            students={visibleStudents}
            editingId={editingId}
            isSearching={searchTerm.trim().length > 0}
            onEdit={startEdit}
            onDelete={setPendingDelete}
          />
        </section>

        {feedback && (
          <div className={`toast toast-${feedback.type}`} role="status">
            {feedback.message}
          </div>
        )}
      </main>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete student?"
        message={
          pendingDelete
            ? `This will permanently remove "${pendingDelete.name}" (${pendingDelete.rollNo}). This action cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default App;
