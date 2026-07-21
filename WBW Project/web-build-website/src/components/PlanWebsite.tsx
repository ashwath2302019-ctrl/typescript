import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { WebsitePlanForm } from '../types'

const initialForm: WebsitePlanForm = {
  name: '',
  email: '',
  phone: '',
  pages: '',
  websiteType: '',
  features: [],
  budget: '',
}

const featureList: string[] = [
  'Contact Form',
  'WhatsApp',
  'Booking Form',
  'Blog',
  'Online Store',
  'Basic SEO',
]

function PlanWebsite() {
  const [form, setForm] = useState<WebsitePlanForm>(initialForm)
  const [message, setMessage] = useState<string>('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))
  }

  const handleFeatureChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value, checked } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      features: checked
        ? [...previousForm.features, value]
        : previousForm.features.filter((feature) => feature !== value),
    }))
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    if (!form.name || !form.email || !form.phone) {
      setMessage('Please fill all required fields.')
      return
    }

    try {
      setMessage('Sending your requirements...')

      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Your requirements were submitted successfully.')
        setForm(initialForm)
      } else {
        setMessage(data.message || 'Failed to submit your requirements.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setMessage('Unable to connect to the backend server.')
    }
  }

  return (
    <section className="section gray-section" id="plan">
      <div className="container">
        <div className="section-title">
          <h2>Plan My Website</h2>
          <p>Fill in your details and website requirements.</p>
        </div>

        <form className="main-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </label>

            <label>
              Number of Pages
              <select
                name="pages"
                value={form.pages}
                onChange={handleChange}
              >
                <option value="">Select pages</option>
                <option value="1-3">1 to 3 Pages</option>
                <option value="4-6">4 to 6 Pages</option>
                <option value="7-10">7 to 10 Pages</option>
              </select>
            </label>

            <label>
              Website Type
              <select
                name="websiteType"
                value={form.websiteType}
                onChange={handleChange}
              >
                <option value="">Select website type</option>
                <option value="Business">Business Website</option>
                <option value="Portfolio">Portfolio Website</option>
                <option value="Store">Online Store</option>
                <option value="Education">Education Website</option>
              </select>
            </label>

            <label>
              Budget
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
              >
                <option value="">Select budget</option>
                <option value="Below 10000">Below ₹10,000</option>
                <option value="10000-20000">₹10,000 to ₹20,000</option>
                <option value="Above 20000">Above ₹20,000</option>
              </select>
            </label>
          </div>

          <h3 className="feature-title">Required Features</h3>

          <div className="feature-grid">
            {featureList.map((feature) => (
              <label className="checkbox-label" key={feature}>
                <input
                  type="checkbox"
                  value={feature}
                  checked={form.features.includes(feature)}
                  onChange={handleFeatureChange}
                />
                {feature}
              </label>
            ))}
          </div>

          {message && <p className="form-message">{message}</p>}

          <button type="submit" className="primary-button">
            Submit Requirements
          </button>
        </form>
      </div>
    </section>
  )
}

export default PlanWebsite