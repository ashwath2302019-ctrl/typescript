import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

function AddInternForm() {
  const { form, error, handleChange, handleReset, isValid } = useInternForm()
  const { addIntern, interns } = useInterns()

  function handleSubmit(): void {
    if (!isValid()) return
    addIntern({ id: interns.length + 1, ...form })
    handleReset()
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

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

      <button onClick={handleSubmit}>Add Intern</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default AddInternForm