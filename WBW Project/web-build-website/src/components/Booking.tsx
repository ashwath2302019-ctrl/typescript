import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { BookingForm } from '../types'

const initialBookingForm: BookingForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  budget: '',
  date: '',
  time: '',
  timeSlot: '',
  consent: false,
}

const timeSlots: string[] = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
]

function Booking() {
  const [form, setForm] = useState<BookingForm>(initialBookingForm)
  const [message, setMessage] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const today: string = new Date().toISOString().split('T')[0]

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value, type } = event.target

    setForm((current) => ({
      ...current,
      [name]:
        type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.date ||
      !form.timeSlot
    ) {
      setMessage('Please complete all the required booking details.')
      setIsError(true)
      return
    }

    if (!form.consent) {
      setMessage('Please accept the privacy and contact consent.')
      setIsError(true)
      return
    }

    try {
      setMessage('Sending your booking details...')
      setIsError(false)

      const response = await fetch('http://localhost:5000/send-booking-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(
          `Your discovery call is booked for ${form.date} at ${form.timeSlot}.`,
        )
        setIsError(false)
        setForm(initialBookingForm)
      } else {
        setMessage(data.message || 'Failed to book your discovery call.')
        setIsError(true)
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      setMessage('Unable to connect to the backend server.')
      setIsError(true)
    }
  }

  return (
    <section className="section booking-section" id="booking">
      <div className="container booking-layout">
        <div className="booking-information">
          <span className="eyebrow">DISCOVERY CALL</span>
          <h2>Let's discuss your website idea</h2>
          <p>
            Book a free discussion with our team. We will understand your
            requirements and recommend the most suitable solution.
          </p>

          <div className="call-details">
            <div>
              <span>⏱️</span>
              <div>
                <h3>30-minute call</h3>
                <p>A focused discussion about your website requirements.</p>
              </div>
            </div>

            <div>
              <span>💡</span>
              <div>
                <h3>Free guidance</h3>
                <p>Receive recommendations on pages, features and budget.</p>
              </div>
            </div>

            <div>
              <span>📅</span>
              <div>
                <h3>Choose your slot</h3>
                <p>Select a convenient date and an available time.</p>
              </div>
            </div>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <h3>Book your call</h3>

          <div className="form-grid">
            <label>
              Full name *
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Company
              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                value={form.company}
                onChange={handleChange}
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Contact number *
              <input
                type="tel"
                name="phone"
                placeholder="Enter contact number"
                value={form.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              Budget range
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
              >
                <option value="">Select budget</option>
                <option value="Below ₹10,000">Below ₹10,000</option>
                <option value="₹10,000–₹20,000">₹10,000–₹20,000</option>
                <option value="₹20,000–₹35,000">₹20,000–₹35,000</option>
                <option value="Above ₹35,000">Above ₹35,000</option>
              </select>
            </label>

            <label>
              Preferred date *
              <input
                type="date"
                name="date"
                min={today}
                value={form.date}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="slot-section">
            <span className="input-title">Available time slots *</span>

            <div className="slot-grid">
              {timeSlots.map((slot) => (
                <label
                  className={`slot-option ${
                    form.timeSlot === slot ? 'selected-slot' : ''
                  }`}
                  key={slot}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot}
                    checked={form.timeSlot === slot}
                    onChange={handleChange}
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="consent-option">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
            />
            <span>
              I agree to be contacted regarding this enquiry and accept the
              privacy terms.
            </span>
          </label>

          {message && (
            <p
              className={`form-message ${
                isError ? 'error-message' : 'success-message'
              }`}
            >
              {message}
            </p>
          )}

          <button className="button primary-button full-button" type="submit">
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  )
}

export default Booking