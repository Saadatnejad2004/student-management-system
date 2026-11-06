import { useEffect, useState } from "react";
import { loadStudents, saveStudents } from "../utils/storage";
import { validateStudent, hasErrors } from "../utils/validation";

const EMPTY_FORM = {
  rollNo: "",
  name: "",
  email: "",
  phone: "",
  course: "",
  year: "",
};

const toTrimmedStudent = (values) => ({
  rollNo: values.rollNo.trim(),
  name: values.name.trim(),
  email: values.email.trim(),
  phone: values.phone.trim(),
  course: values.course.trim(),
  year: Number(values.year),
});

export const useStudents = () => {
  const [students, setStudents] = useState(() => loadStudents());
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null); // { type, message }

  // 1) Persist to localStorage whenever `students` changes
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  // 2) Auto-dismiss the toast after 3 seconds
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingId(null);
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // clear that field's error as the user types — better UX than waiting for submit
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // stop the browser's default full-page reload

    const validationErrors = validateStudent(form, students, editingId);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      setFeedback({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    const now = new Date().toISOString();

    if (editingId) {
      // UPDATE — map over the array, replace only the matching id
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId
            ? { ...student, ...toTrimmedStudent(form), updatedAt: now }
            : student
        )
      );
      setFeedback({ type: "success", message: "Student updated successfully." });
    } else {
      // CREATE — prepend a new student (newest first)
      const newStudent = {
        id: crypto.randomUUID(),
        ...toTrimmedStudent(form),
        createdAt: now,
        updatedAt: now,
      };
      setStudents((prev) => [newStudent, ...prev]);
      setFeedback({ type: "success", message: "Student added successfully." });
    }

    resetForm();
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({
      rollNo: student.rollNo,
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
      year: String(student.year), // inputs hold strings
    });
    setErrors({});
    setFeedback(null);
  };

  const cancelEdit = () => resetForm();

  const deleteStudent = (id) => {
    // DELETE — keep every student whose id is NOT this one
    setStudents((prev) => prev.filter((student) => student.id !== id));
    if (editingId === id) resetForm(); // deleting the record you're editing
    setFeedback({ type: "success", message: "Student deleted." });
  };

  return {
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
  };
};
