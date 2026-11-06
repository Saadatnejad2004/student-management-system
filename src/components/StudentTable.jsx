import EmptyState from "./EmptyState";

const StudentTable = ({ students, editingId, isSearching, onEdit, onDelete }) => {
  if (students.length === 0) {
    return <EmptyState isSearching={isSearching} />;
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Year</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className={student.id === editingId ? "row-editing" : ""}
            >
              <td data-label="Roll No">{student.rollNo}</td>
              <td data-label="Name">{student.name}</td>
              <td data-label="Email">{student.email}</td>
              <td data-label="Phone">{student.phone}</td>
              <td data-label="Course">{student.course}</td>
              <td data-label="Year">{student.year}</td>
              <td data-label="Actions" className="actions">
                <button
                  type="button"
                  className="btn btn-small btn-ghost"
                  onClick={() => onEdit(student)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(student)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
