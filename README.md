# Kannamma - Maternal Health Voice Guardian

> "A mother doesn't need an app — she just needs a voice that remembers."

Kannamma is an IVR-based voice guardian system that calls expecting mothers weekly in Tamil/Telugu, reminds them about checkups and tablets, and connects them to ASHA workers when they need help.

## 🎯 Features

- **IVR Voice Calls** - Automated weekly reminders in Tamil/Telugu
- **ASHA Dashboard** - React-based dashboard for ASHA workers
- **Health Tracking** - Period tracking, PCOS management, post-pregnancy care
- **Appointment Management** - Schedule and track ANC appointments
- **PHC Stock Management** - Track medicine and vaccine inventory
- **Flagged Mothers** - Automatic flagging when help is needed
- **Call Logs** - Complete history of all IVR calls

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Windows (Command Prompt):**
```bash
cd backend
run.bat
```

**Windows (PowerShell):**
```powershell
cd backend
.\run.bat
# OR
.\run.ps1
```

**Mac/Linux:**
```bash
cd backend
chmod +x run.sh
./run.sh
```

### Option 2: Manual Setup

See [SETUP_AND_RUN.md](./SETUP_AND_RUN.md) for detailed step-by-step instructions.

### Quick Commands

```bash
# Backend
cd backend
python setup.py      # Initialize database
python app.py        # Start server (http://localhost:5000)

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
```

## 📁 Project Structure

```
kannama/
├── backend/          # Flask API backend
├── frontend/         # React dashboard
├── database/         # Database schemas
└── docs/            # Documentation
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for complete structure.

## 🔌 API Endpoints

- **Auth:** `/api/auth/login`, `/api/auth/register`
- **Mothers:** `/api/mothers`, `/api/mothers/<id>`
- **IVR:** `/api/ivr/webhook`, `/api/ivr/initiate-call`
- **Health:** `/api/health/records`, `/api/health/period-tracker`
- **PHC:** `/api/phc/stock`
- **Appointments:** `/api/appointments`

See [backend/README.md](./backend/README.md) for complete API documentation.

## 🗄️ Database

The system uses SQLAlchemy ORM and supports:
- **SQLite** (default for development)
- **PostgreSQL** (recommended for production)

Database is automatically created on first run via `setup.py`.

## 🔐 Default Login

After running `setup.py`, use these credentials:

- **ASHA ID:** `ASHA001`
- **Password:** `password123`

## 📞 IVR Integration

Kannamma integrates with Twilio/Exotel for voice calls:

1. Sign up for Twilio account
2. Get Account SID and Auth Token
3. Buy a phone number
4. Add credentials to `backend/.env`
5. Set webhook URL: `https://your-domain.com/api/ivr/webhook`

See [CONNECTION_GUIDE.md](./CONNECTION_GUIDE.md) for detailed IVR setup.

## 🛠️ Tech Stack

**Backend:**
- Flask (Python web framework)
- SQLAlchemy (ORM)
- Flask-JWT-Extended (Authentication)
- Twilio (IVR integration)

**Frontend:**
- React + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)

## 📚 Documentation

- [SETUP_AND_RUN.md](./SETUP_AND_RUN.md) - Complete setup guide
- [CONNECTION_GUIDE.md](./CONNECTION_GUIDE.md) - IVR-React connection
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - File structure
- [backend/README.md](./backend/README.md) - API documentation
- [QUICK_START.md](./QUICK_START.md) - Quick reference

## 🎯 Use Cases

1. **Weekly Reminders** - Automated calls to remind about medications
2. **Appointment Confirmations** - Voice reminders for upcoming ANC visits
3. **Help Detection** - Automatic flagging when mother needs assistance
4. **Health Tracking** - Period tracking, PCOS management, post-pregnancy care
5. **Stock Alerts** - Notify when PHC stock is low

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is part of a hackathon submission.

## 🆘 Support

For issues or questions:
1. Check [SETUP_AND_RUN.md](./SETUP_AND_RUN.md) troubleshooting section
2. Review [CONNECTION_GUIDE.md](./CONNECTION_GUIDE.md) for integration help
3. Check backend logs for error messages

## 🎉 Acknowledgments

Built for maternal health care in rural Tamil Nadu, India.

---

**Made with ❤️ for mothers and ASHA workers**

