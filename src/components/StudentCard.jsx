const StudentCard = ({ student }) => {
  const { name, email, phone, course, year } = student;

  return (
    <div className="student-card">
      <h3>{name}</h3>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Course:</strong> {course}</p>
      <p><strong>Year:</strong> {year}</p>
    </div>
  );
};

export default StudentCard;
