import { useState } from 'react'

interface FormState {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}

const initialForm: FormState = {
  name: '', score: 0, isPresent: true, role: 'Frontend',
}

function InternObjectForm() {
  const [form, setForm] = useState<FormState>(initialForm)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm(prev => ({ ...prev, name: e.target.value }))
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm(prev => ({ ...prev, score: Number(e.target.value) }))
  }

  function handlePresentChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm(prev => ({ ...prev, isPresent: e.target.checked }))
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setForm(prev => ({ ...prev, role: e.target.value }))
  }

  function handleReset(): void {
    setForm(initialForm)
  }

  return (
    <div>
      <input type="text"     value={form.name}      onChange={handleNameChange}    placeholder="Name"  />
      <input type="number"   value={form.score}      onChange={handleScoreChange}   placeholder="Score" />
      <input type="checkbox" checked={form.isPresent} onChange={handlePresentChange} />
      <label>Present</label>
      <select value={form.role} onChange={handleRoleChange}>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <p>Name: {form.name} | Score: {form.score} | Present: {form.isPresent ? 'Yes' : 'No'} | Role: {form.role}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default InternObjectForm


// **Write a comment** explaining why 
// `{ ...prev, name: e.target.value }` is used instead of directly modifying `form.name`. What would happen if you forgot the spread?

// We use { ...prev, name: e.target.value } to copy all existing
// properties from the previous form object and update only the
// 'name' field. React state objects should not be modified directly.
//
// If we forgot the spread operator, only the 'name' property would
// be provided in the new object, and the other properties
// (score, isPresent, and role) would be lost. TypeScript would also
// report an error because the object would no longer match FormState.