import StudentCard from "./components/StudentCard";

const App = () => {
  const sampleStudent = {
    id: "1",
    name: "AmirHossein Saadatnejad",
    email: "mynameisking@gmail.com",
    phone: "9876543210",
    course: "Computer Science",
    year: 2,
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <StudentCard student={sampleStudent} />
    </div>
  );
};

export default App;
