const Field = ({ label, name, type = "text", value, error, placeholder, autoComplete, onChange }) => (
  <div className="field">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => onChange(name, e.target.value)}
      className={error ? "input input-error" : "input"}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p className="field-error" id={`${name}-error`}>
        {error}
      </p>
    )}
  </div>
);

const StudentForm = ({ form, errors, editingId, onChange, onSubmit, onCancel }) => {
  return (
    <form className="card form" onSubmit={onSubmit} noValidate>
      <h2 className="form-title">{editingId ? "Edit Student" : "Add Student"}</h2>

      <div className="form-grid">
        <Field
          label="Roll Number"
          name="rollNo"
          value={form.rollNo}
          error={errors.rollNo}
          onChange={onChange}
          placeholder="e.g. S-2024-001"
          autoComplete="off"
        />
        <Field
          label="Full Name"
          name="name"
          value={form.name}
          error={errors.name}
          onChange={onChange}
          placeholder="e.g. AmirHossein Saadatnejad"
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={onChange}
          placeholder="e.g. amiristhebest@example.com"
          autoComplete="email"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          error={errors.phone}
          onChange={onChange}
          placeholder="e.g. 989131094475"
          autoComplete="tel"
        />
        <Field
          label="Course"
          name="course"
          value={form.course}
          error={errors.course}
          onChange={onChange}
          placeholder="e.g. Computer Science"
          autoComplete="off"
        />
        <Field
          label="Year"
          name="year"
          type="number"
          value={form.year}
          error={errors.year}
          onChange={onChange}
          placeholder="1-6"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingId ? "Save Changes" : "Add Student"}
        </button>
        {editingId && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
