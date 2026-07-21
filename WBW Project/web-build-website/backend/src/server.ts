import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import dns from 'node:dns'
import Booking from './models/Booking'

dotenv.config()

dns.setServers(['8.8.8.8', '1.1.1.1'])

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  throw new Error('MONGODB_URI is missing from the .env file')
}
console.log('MongoDB URI begins with:', JSON.stringify(mongoUri.slice(0, 20)))
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully')
    console.log('Connected database:', mongoose.connection.name)
    console.log('Connected host:', mongoose.connection.host)
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
  })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function createDetailRow(
  label: string,
  value: string,
  backgroundColor = '#ffffff',
): string {
  return `
    <tr style="background-color:${backgroundColor};">
      <td
        width="38%"
        style="
          padding:14px 16px;
          border-bottom:1px solid #e2e8f0;
          color:#475569;
          font-size:14px;
          font-weight:bold;
        "
      >
        ${label}
      </td>

      <td
        style="
          padding:14px 16px;
          border-bottom:1px solid #e2e8f0;
          color:#0f172a;
          font-size:14px;
          line-height:1.5;
          word-break:break-word;
        "
      >
        ${value}
      </td>
    </tr>
  `
}

function createAdminEmailLayout(
  title: string,
  description: string,
  badgeText: string,
  bannerImage: string,
  details: string,
  customerEmail: string,
  customerPhone: string,
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>

      <body style="margin:0;padding:0;background-color:#eef2f7;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="background-color:#eef2f7;"
        >
          <tr>
            <td align="center" style="padding:30px 15px;">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  max-width:650px;
                  background-color:#ffffff;
                  border-radius:16px;
                  overflow:hidden;
                  box-shadow:0 8px 30px rgba(15,23,42,0.10);
                "
              >
                <tr>
                  <td
                    style="
                      background:linear-gradient(135deg,#172554,#2563eb);
                      padding:22px 28px;
                    "
                  >
                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>
                        <td valign="middle">
                          <table
                            role="presentation"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                          >
                            <tr>
                              <td
                                align="center"
                                valign="middle"
                                style="
                                  width:48px;
                                  height:48px;
                                  background-color:#ffffff;
                                  border-radius:12px;
                                  color:#2563eb;
                                  font-size:18px;
                                  font-weight:bold;
                                "
                              >
                                WB
                              </td>

                              <td style="padding-left:14px;">
                                <p
                                  style="
                                    margin:0;
                                    color:#ffffff;
                                    font-size:20px;
                                    font-weight:bold;
                                  "
                                >
                                  WebBuild
                                </p>

                                <p
                                  style="
                                    margin:4px 0 0;
                                    color:#dbeafe;
                                    font-size:12px;
                                  "
                                >
                                  Website Design & Development
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <td align="right" valign="middle">
                          <span
                            style="
                              display:inline-block;
                              padding:7px 12px;
                              background-color:rgba(255,255,255,0.16);
                              border:1px solid rgba(255,255,255,0.28);
                              border-radius:20px;
                              color:#ffffff;
                              font-size:12px;
                              font-weight:bold;
                            "
                          >
                            ${badgeText}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td>
                    <img
                      src="${bannerImage}"
                      alt="WebBuild notification"
                      width="650"
                      style="
                        width:100%;
                        max-width:650px;
                        height:220px;
                        object-fit:cover;
                        display:block;
                        border:0;
                      "
                    />
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px 30px 15px;">
                    <h1
                      style="
                        margin:0 0 10px;
                        color:#0f172a;
                        font-size:27px;
                        line-height:1.3;
                      "
                    >
                      ${title}
                    </h1>

                    <p
                      style="
                        margin:0;
                        color:#64748b;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      ${description}
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:15px 30px;">
                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        background-color:#f8fafc;
                        border:1px solid #e2e8f0;
                        border-radius:12px;
                        overflow:hidden;
                      "
                    >
                      ${details}
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:18px 30px 34px;">
                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            background-color:#2563eb;
                            border-radius:8px;
                          "
                        >
                          <a
                            href="mailto:${customerEmail}"
                            style="
                              display:inline-block;
                              padding:13px 22px;
                              color:#ffffff;
                              text-decoration:none;
                              font-size:14px;
                              font-weight:bold;
                            "
                          >
                            Reply to Customer
                          </a>
                        </td>

                        <td style="width:12px;"></td>

                        <td
                          align="center"
                          style="
                            background-color:#0f172a;
                            border-radius:8px;
                          "
                        >
                          <a
                            href="tel:${customerPhone}"
                            style="
                              display:inline-block;
                              padding:13px 22px;
                              color:#ffffff;
                              text-decoration:none;
                              font-size:14px;
                              font-weight:bold;
                            "
                          >
                            Call Customer
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    style="
                      background-color:#0f172a;
                      padding:22px;
                    "
                  >
                    <p
                      style="
                        margin:0 0 7px;
                        color:#ffffff;
                        font-size:14px;
                        font-weight:bold;
                      "
                    >
                      WebBuild Website Services
                    </p>

                    <p
                      style="
                        margin:0;
                        color:#94a3b8;
                        font-size:12px;
                        line-height:1.6;
                      "
                    >
                      This notification was automatically generated from your
                      website.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function createCustomerEmailLayout(
  customerName: string,
  heading: string,
  description: string,
  details: string,
): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${heading}</title>
      </head>

      <body style="margin:0;padding:0;background-color:#eef2f7;font-family:Arial,Helvetica,sans-serif;">
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="background-color:#eef2f7;"
        >
          <tr>
            <td align="center" style="padding:30px 15px;">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  max-width:620px;
                  background-color:#ffffff;
                  border-radius:16px;
                  overflow:hidden;
                  box-shadow:0 8px 30px rgba(15,23,42,0.10);
                "
              >
                <tr>
                  <td
                    align="center"
                    style="
                      background:linear-gradient(135deg,#172554,#2563eb);
                      padding:32px;
                    "
                  >
                    <div
                      style="
                        width:60px;
                        height:60px;
                        line-height:60px;
                        background-color:#ffffff;
                        border-radius:14px;
                        color:#2563eb;
                        font-size:21px;
                        font-weight:bold;
                        margin-bottom:14px;
                      "
                    >
                      WB
                    </div>

                    <h1
                      style="
                        margin:0;
                        color:#ffffff;
                        font-size:27px;
                      "
                    >
                      ${heading}
                    </h1>

                    <p
                      style="
                        margin:10px 0 0;
                        color:#dbeafe;
                        font-size:14px;
                      "
                    >
                      WebBuild Website Services
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px 30px;">
                    <p
                      style="
                        margin:0 0 16px;
                        color:#1f2937;
                        font-size:16px;
                        line-height:1.7;
                      "
                    >
                      Hello <strong>${customerName}</strong>,
                    </p>

                    <p
                      style="
                        margin:0 0 22px;
                        color:#475569;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      ${description}
                    </p>

                    <table
                      role="presentation"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="
                        background-color:#f8fafc;
                        border:1px solid #e2e8f0;
                        border-radius:12px;
                        overflow:hidden;
                      "
                    >
                      ${details}
                    </table>

                    <p
                      style="
                        margin:24px 0 0;
                        color:#475569;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      Our team will contact you shortly using the information
                      you provided.
                    </p>

                    <p
                      style="
                        margin:22px 0 0;
                        color:#1f2937;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      Regards,<br />
                      <strong>WebBuild Team</strong>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    style="
                      background-color:#0f172a;
                      padding:20px;
                    "
                  >
                    <p
                      style="
                        margin:0;
                        color:#94a3b8;
                        font-size:12px;
                      "
                    >
                      This is an automatic confirmation email from WebBuild.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

app.post('/send-booking-email', async (request: Request, response: Response) => {
  try {
    console.log('Booking API called')
    console.log('Booking form data:', request.body)

    const {
      name,
      company,
      email,
      phone,
      budget,
      date,
      timeSlot,
    } = request.body

    if (!name || !email || !phone || !date || !timeSlot) {
      response.status(400).json({
        success: false,
        message: 'Please complete all required booking details.',
      })
      return
    }

    const safeName = escapeHtml(name)
    const safeCompany = escapeHtml(company || 'Not provided')
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeBudget = escapeHtml(budget || 'Not selected')
    const safeDate = escapeHtml(date)
    const safeTimeSlot = escapeHtml(timeSlot)

    console.log('Saving booking to MongoDB...')

    const savedBooking = await Booking.create({
      name,
      company: company || 'Not provided',
      email,
      phone,
      budget: budget || 'Not selected',
      date,
      timeSlot,
    })

    console.log('Booking saved to MongoDB successfully')
    console.log('Saved booking ID:', savedBooking._id)

    const adminDetails =
      createDetailRow('Customer Name', safeName) +
      createDetailRow('Company', safeCompany, '#f8fafc') +
      createDetailRow(
        'Email Address',
        `<a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a>`,
      ) +
      createDetailRow(
        'Phone Number',
        `<a href="tel:${safePhone}" style="color:#2563eb;text-decoration:none;">${safePhone}</a>`,
        '#f8fafc',
      ) +
      createDetailRow('Budget Range', safeBudget) +
      createDetailRow('Preferred Date', safeDate, '#f8fafc') +
      createDetailRow('Preferred Time', safeTimeSlot)

    const adminEmailHtml = createAdminEmailLayout(
      'New Discovery Call Booking',
      'A customer has booked a discovery call through your website. Check the selected date and time before contacting them.',
      'CALL BOOKING',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
      adminDetails,
      safeEmail,
      safePhone,
    )

    console.log('Sending admin booking email...')

    await transporter.sendMail({
      from: `"WebBuild Bookings" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `Discovery Call Booking from ${safeName}`,
      html: adminEmailHtml,
    })

    console.log('Admin booking email sent successfully')

    const customerDetails =
      createDetailRow('Company', safeCompany) +
      createDetailRow('Phone Number', safePhone, '#f8fafc') +
      createDetailRow('Budget Range', safeBudget) +
      createDetailRow('Preferred Date', safeDate, '#f8fafc') +
      createDetailRow('Preferred Time', safeTimeSlot)

    const customerEmailHtml = createCustomerEmailLayout(
      safeName,
      'Booking Confirmed',
      'Thank you for booking a discovery call with WebBuild. Your booking has been successfully received. Please review your booking details below.',
      customerDetails,
    )

    console.log('Sending customer confirmation email...')

    await transporter.sendMail({
      from: `"WebBuild" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_RECEIVER,
      subject: 'Your discovery call booking is confirmed',
      html: customerEmailHtml,
    })

    console.log('Customer confirmation email sent successfully')

    response.status(200).json({
      success: true,
      message: 'Booking saved and emails sent successfully.',
    })
  } catch (error) {
    console.error('Booking error:', error)

    response.status(500).json({
      success: false,
      message: 'Failed to save booking or send emails.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})