# Invoo — AI-Powered Invoice Generator SaaS

> A full-stack MERN application that lets you generate professional invoices in seconds using AI. Paste any text and watch AI extract client details, line items, and totals automatically.



---

## 🚀 Features

- **AI Invoice Generation** — Paste freeform text and let Gemini AI extract invoice details instantly
- **Authentication** — Secure sign in / sign up powered by Clerk
- **Invoice Management** — Create, view, edit, and delete invoices
- **Business Profile** — Store your business details, logo, stamp, and signature
- **PDF Export** — Generate and download professional PDF invoices
- **Email Reminders** — AI-generated reminder emails for unpaid invoices
- **Dashboard** — Track total invoices, paid/unpaid amounts, and business insights
- **Multi-currency Support** — INR and USD support
- **Responsive Design** — Works on desktop and mobile
- **Docker Support** — Fully containerized with Docker Compose

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Clerk | Authentication |
| React Router DOM | Routing |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| Clerk Express | Auth Middleware |
| Multer | File Uploads |
| Google Gemini AI | AI Invoice Generation |

### DevOps
| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |

---

## 📁 Project Structure

```
invoo/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controller/
│   │   ├── invoiceController.js   # Invoice CRUD logic
│   │   └── buisnessProfileController.js
│   ├── models/
│   │   ├── invoiceModel.js
│   │   └── buisnessProfileModel.js
│   ├── routes/
│   │   ├── invoiceRouter.js
│   │   ├── buinessProfileRouter.js
│   │   └── aiInvoiceRouter.js
│   ├── uploads/                   # Uploaded files (logo, stamp, signature)
│   ├── .env                       # Environment variables
│   ├── server.js                  # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── dummyStyles.js     # All Tailwind class definitions
│   │   │   └── GenerateBtn/
│   │   │       ├── Gbtn.jsx
│   │   │       └── Gbtn.css
│   │   ├── components/
│   │   │   ├── AppShell.jsx       # Main layout with sidebar
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── KpiCard.jsx
│   │   │   ├── GeminiIcon.jsx
│   │   │   └── AiInvoiceModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                       # Environment variables
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (optional, for Docker setup)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A [Clerk](https://clerk.com/) account
- A [Google AI Studio](https://makersuite.google.com/) account (for Gemini API)

---

## 🔧 Environment Variables

### Backend — `backend/.env`

---

### Frontend — `frontend/.env`

```env
# Clerk Publishable Key — from Clerk Dashboard → API Keys
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx

# API Base URL
VITE_API_BASE=http://localhost:4000
```

---

## 🏃 Running Locally (Without Docker)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/invoo.git
cd invoo
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file inside `backend/` using the template above.

Start the backend:
```bash
npm start
```

You should see:
```
Server started on http://localhost:4000
DB CONNECTED
```

### 3. Setup Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
```

Create your `.env` file inside `frontend/` using the template above.

Start the frontend:
```bash
npm run dev
```

You should see:
```
VITE ready on http://localhost:5173
```

### 4. Open the app

Visit `http://localhost:5173` in your browser.

---

## 🐳 Running with Docker

### 1. Make sure Docker is running

```bash
docker --version
docker compose version
```

### 2. Clone the repository

```bash
git clone https://github.com/yourusername/invoo.git
cd invoo
```

### 3. Create environment files

Create `backend/.env` and `frontend/.env` using the templates above.

### 4. Build and start containers

```bash
docker compose up --build -d
```

This will:
- Build the backend image and start it on port `4000`
- Build the frontend image and start it on port `5173`

### 5. Check containers are running

```bash
docker compose ps
```

### 6. Open the app

Visit `http://localhost:5173` in your browser.

### 7. Stop containers

```bash
docker compose down
```

---

## 🔑 Setting Up Third-Party Services

### MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Go to **Database Access** → Add a database user
4. Go to **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Go to **Connect** → **Drivers** → copy the connection string
6. Replace `<username>`, `<password>`, and `<dbname>` with your values
7. Paste into `MONGODB_URI` in `backend/.env`

> ⚠️ **Note:** If you're using Node.js v24+, use the direct connection string (without `+srv`) to avoid DNS SRV lookup issues.

### Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Go to **API Keys**
4. Copy the **Publishable Key** → paste into `VITE_CLERK_PUBLISHABLE_KEY` in `frontend/.env`
5. Copy the **Secret Key** → paste into `CLERK_SECRET_KEY` in `backend/.env`

### Google Gemini AI

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy it → paste into `GOOGLE_API_KEY` in `backend/.env`

---

## 📡 API Endpoints

### Invoices
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/invoices` | Get all invoices for authenticated user |
| GET | `/api/invoices/:id` | Get invoice by ID or invoice number |
| POST | `/api/invoices` | Create a new invoice |
| PUT | `/api/invoices/:id` | Update an invoice |
| DELETE | `/api/invoices/:id` | Delete an invoice |

### Business Profile
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/business-profile/me` | Get current user's business profile |
| POST | `/api/business-profile` | Create a business profile |
| PUT | `/api/business-profile/:id` | Update a business profile |

### AI Invoice Generation
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/generate` | Generate invoice from text using Gemini AI |

---

## 🗺️ App Routes

| Route | Description |
|---|---|
| `/` | Landing page (Hero, Features, Pricing) |
| `/app` | Protected app shell with sidebar |
| `/app/dashboard` | Dashboard with KPI cards and recent invoices |
| `/app/invoices` | All invoices list |
| `/app/invoices/:id` | Invoice detail / preview |
| `/app/create-invoice` | Create new invoice |
| `/app/business` | Business profile settings |

---

## 🐛 Common Issues & Fixes

### `querySrv ECONNREFUSED` on Node.js v24
Node.js v24 has a DNS SRV lookup bug. Use the direct connection string instead of `mongodb+srv://`:
```env
MONGODB_URI=mongodb://user:pass@shard-00-00.xxx.mongodb.net:27017,...
```

### CORS Error in browser
Make sure your `server.js` has the correct frontend origin:
```javascript
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
```

### `Failed to fetch` on Dashboard
- Check that your backend is running on port `4000`
- Check that `VITE_API_BASE=http://localhost:4000` is set in `frontend/.env`
- Check MongoDB Atlas Network Access allows your IP

### Clerk sign-in modal not opening
Make sure `@clerk/clerk-react` is installed:
```bash
cd frontend
npm install @clerk/clerk-react
```

---

## 📸 Screenshots

| Landing Page | Dashboard |
|---|---|
| Hero section with AI demo card | KPI cards with invoice tracking |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Aary Deshpande**
- GitHub: [@AaryAd26](https://github.com/AaryAd26)

---

## 🙏 Acknowledgements

- [Clerk](https://clerk.com/) — Authentication
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — Database
- [Google Gemini AI](https://deepmind.google/technologies/gemini/) — AI Invoice Generation
- [Tailwind CSS](https://tailwindcss.com/) — Styling
