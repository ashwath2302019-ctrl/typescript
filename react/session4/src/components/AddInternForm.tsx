import useInternForm from '../hooks/useInternForm';
import { useInterns } from '../contexts/intern-context';

function AddInternForm() {
  const {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
  } = useInternForm();

  const { addIntern, interns } = useInterns();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    const nextId =
      interns.length > 0
        ? Math.max(...interns.map((intern) => intern.id)) + 1
        : 1;

    addIntern({
      id: nextId,
      ...form,
    });

    handleReset();
  }

  return (
    <form
      aria-label="Add Intern"
      onSubmit={handleSubmit}
    >
      {error && (
        <p
          role="alert"
          className="validation-error"
          style={{ color: 'red' }}
        >
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name">Intern Name</label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>

      <div>
        <label htmlFor="score">Score</label>

        <input
          id="score"
          name="score"
          type="number"
          value={form.score}
          onChange={handleChange}
          placeholder="Score"
        />
      </div>

      <div>
        <input
          id="isPresent"
          name="isPresent"
          type="checkbox"
          checked={form.isPresent}
          onChange={handleChange}
        />

        <label htmlFor="isPresent">Present</label>
      </div>

      <div>
        <label htmlFor="role">Role</label>

        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </div>

      <button type="submit">
        Add Intern
      </button>

      <button
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>
    </form>
  );
}

export default AddInternForm;