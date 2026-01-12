Expense Splitter

A modern Expense Management Web Application built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS for styling.

This project allows users to:

Register and login securely

Recover passwords via OTP email/WhatsApp

Add and manage shared expenses

Track who paid and who owes

Export expense data in PDF or CSV format

Receive notifications (email/WhatsApp) for important events

🛠️ Features
Authentication

Register with name, email, phone, and password

Login with email & password

Password recovery using OTP (email/WhatsApp)

Secure JWT authentication

Expense Management

Add expenses with title, amount, paid by, and participants

Automatic calculation of who owes whom

Export expenses as PDF or CSV

Settlement of balances

UI / UX

Responsive and professional design with Tailwind CSS

Illustrations and visual cues for better experience

Army green theme for a modern aesthetic

Notifications

Email notifications for password recovery & new expense

WhatsApp notifications for key events (optional, backend-configurable)

📦 Tech Stack
Layer	Technology
Frontend	React, Tailwind CSS, Axios, React Router
Backend	Node.js, Express, Mongoose, bcryptjs, JWT
Database	MongoDB
Utils	Nodemailer (Email), Twilio (WhatsApp), PDFKit / json2csv
⚡ Installation
1. Clone the repository
git clone https://github.com/yourusername/expense-splitter.git
cd expense-splitter

2. Backend setup
cd server
npm install


Create a .env file in server/:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone


Start backend:

npm run dev

3. Frontend setup
cd client
npm install
npm run dev


Open http://localhost:5173
 in your browser.

🗂️ Project Structure
Backend
server/
 ├─ controllers/        # Business logic for auth, expenses
 ├─ models/             # MongoDB schemas
 ├─ routes/             # Express routes
 ├─ utils/              # sendEmail, sendWhatsApp, OTP, export utilities
 ├─ middleware/         # Auth middleware
 ├─ app.js              # Express app
 └─ server.js           # Server entry

Frontend
client/
 ├─ src/
 │   ├─ pages/          # Login, Register, Dashboard, Expenses, OTP
 │   ├─ components/     # Reusable UI components
 │   ├─ hooks/          # useAuth
 │   ├─ api/            # Axios instance
 │   ├─ assets/         # Images & illustrations
 │   └─ utils/          # exportPDF, exportCSV

🚀 Usage

Register a new account with name, email, phone, password

Login and access the dashboard

Add expenses with participants

Export expenses as PDF or CSV

Recover password via OTP if needed

🔐 Security

Passwords are hashed using bcryptjs

JWT used for authentication and protected routes

OTP stored temporarily and expires after 10 minutes

📈 Future Enhancements

Add group management for shared expenses

Add real-time notifications with Socket.IO

Improve analytics (charts & trends)

Multi-currency support

📝 License

This project is MIT Licensed – feel free to use and modify.