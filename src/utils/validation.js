export const validateStudent = (values, existingStudents, editingId = null) => {
  const errors = {};

  // --- Name ---
  const name = values.name.trim();
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 60) {
    errors.name = "Name must be 60 characters or fewer.";
  } else if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(name)) {
    errors.name = "Name contains invalid characters.";
  }

  // --- Roll number (required + unique) ---
  const rollNo = values.rollNo.trim();
  if (!rollNo) {
    errors.rollNo = "Roll number is required.";
  } else if (!/^[A-Za-z0-9-]{3,20}$/.test(rollNo)) {
    errors.rollNo = "Roll number must be 3–20 letters, digits, or hyphens.";
  } else {
    const duplicate = existingStudents.find(
      (s) => s.rollNo.toLowerCase() === rollNo.toLowerCase() && s.id !== editingId
    );
    if (duplicate) errors.rollNo = "This roll number is already in use.";
  }

  // --- Email (required + format + unique) ---
  const email = values.email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  } else {
    const duplicate = existingStudents.find(
      (s) => s.email.toLowerCase() === email.toLowerCase() && s.id !== editingId
    );
    if (duplicate) errors.email = "This email is already registered.";
  }

  // --- Phone (required + format) ---
  const phone = values.phone.trim();
  const phoneDigits = phone.replace(/[\s\-()]/g, "");
  if (!phone) {
    errors.phone = "Phone is required.";
  } else if (!/^\+?\d{7,15}$/.test(phoneDigits)) {
    errors.phone = "Phone must be 7–15 digits (optional leading +).";
  }

  // --- Course ---
  const course = values.course.trim();
  if (!course) {
    errors.course = "Course is required.";
  } else if (course.length > 80) {
    errors.course = "Course must be 80 characters or fewer.";
  }

  // --- Year ---
  if (values.year === "" || values.year === null || values.year === undefined) {
    errors.year = "Year is required.";
  } else {
    const yearNum = Number(values.year);
    if (!Number.isInteger(yearNum)) {
      errors.year = "Year must be a whole number.";
    } else if (yearNum < 1 || yearNum > 6) {
      errors.year = "Year must be between 1 and 6.";
    }
  }

  return errors;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;
