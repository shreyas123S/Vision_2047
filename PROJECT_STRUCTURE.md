# Kannamma Project Structure

## Complete File Structure

```
kannama/
├── backend/                          # Flask Backend API
│   ├── app.py                        # Main Flask application entry point
│   ├── config.py                     # Configuration settings
│   ├── extensions.py                 # Flask extensions (db, etc.)
│   ├── models.py                     # SQLAlchemy database models
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── README.md                     # Backend documentation
│   │
│   ├── routes/                       # API route blueprints
│   │   ├── __init__.py              # Route registration
│   │   ├── auth.py                  # Authentication (login, register)
│   │   ├── mothers.py               # Mother/patient management
│   │   ├── ashas.py                 # ASHA worker endpoints
│   │   ├── ivr.py                   # IVR webhook & call management
│   │   ├── phc.py                   # PHC stock management
│   │   ├── health.py                # Health tracking (periods, PCOS, etc.)
│   │   └── appointments.py          # Appointment scheduling
│   │
│   ├── services/                     # Business logic services
│   │   ├── __init__.py
│   │   └── ivr_service.py           # IVR call handling (Twilio/Exotel)
│   │
│   └── utils/                        # Utility functions
│       ├── __init__.py
│       └── helpers.py               # Helper functions
│
├── frontend/                         # React Frontend (ASHA Dashboard)
│   ├── src/
│   │   ├── App.tsx                  # Main app component
│   │   ├── main.tsx                 # React entry point
│   │   ├── Router.tsx               # Route definitions
│   │   │
│   │   ├── components/              # React components
│   │   │   ├── CallAllModal.tsx
│   │   │   ├── CallLogsList.tsx
│   │   │   ├── FlaggedMothersList.tsx
│   │   │   ├── MotherCard.tsx
│   │   │   ├── PHCStockPanel.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── SingleCallModal.tsx
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.tsx        # ASHA dashboard
│   │   │   ├── Login.tsx            # Login page
│   │   │   └── MotherProfile.tsx    # Individual mother profile
│   │   │
│   │   ├── contexts/                # React contexts
│   │   │   └── AuthContext.tsx      # Authentication context
│   │   │
│   │   └── lib/                     # Utilities & config
│   │       └── supabase.ts          # Supabase client (can be replaced with Flask API)
│   │
│   ├── package.json                 # Node dependencies
│   ├── vite.config.ts               # Vite configuration
│   └── tailwind.config.js           # Tailwind CSS config
│
└── database/                         # Database migrations & scripts
    └── (migrations can go here)
```

## How IVR Connects to React Dashboard

### Connection Flow:

1. **IVR Call Initiated**
   - Flask backend calls Twilio API → `POST /api/ivr/initiate-call`
   - Twilio makes phone call to mother

2. **IVR Webhook**
   - Twilio POSTs to Flask → `POST /api/ivr/webhook`
   - Flask processes call, logs to database
   - If mother needs help → `mother.flagged = True`

3. **React Dashboard Updates**
   - React polls Flask API → `GET /api/mothers/flagged`
   - Dashboard shows flagged mothers in real-time
   - ASHA worker sees alert and can follow up

### API Connection:

**Frontend → Backend:**
```typescript
// In React, replace Supabase calls with Flask API
const API_BASE = 'http://localhost:5000/api';

// Example: Fetch mothers
fetch(`${API_BASE}/mothers`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

**Backend → IVR:**
```python
# Flask calls Twilio
ivr_service.initiate_call(mother, 'reminder')
# Twilio calls mother's phone
# Twilio POSTs back to Flask webhook
```

## Key Features

### 1. IVR System (Voice Calls)
- ✅ Twilio/Exotel integration
- ✅ Tamil/Telugu voice prompts
- ✅ DTMF input handling (1, 2, 3)
- ✅ Automatic flagging for help requests
- ✅ Call logging

### 2. ASHA Dashboard (React)
- ✅ Mother management
- ✅ Flagged mothers list
- ✅ Call logs viewing
- ✅ PHC stock management
- ✅ Appointment tracking

### 3. Health Tracking
- ✅ Period tracking
- ✅ PCOS management
- ✅ Post-pregnancy care
- ✅ Medication reminders
- ✅ Symptom logging

### 4. Appointment Management
- ✅ Schedule appointments
- ✅ Upcoming appointments view
- ✅ Appointment reminders via IVR

## Database Schema

- **ashas** - ASHA worker accounts
- **mothers** - Patient records with health tracking
- **phc_stock** - PHC inventory
- **call_logs** - IVR call history
- **health_records** - Periods, symptoms, medications
- **appointments** - Appointment scheduling
- **ivr_schedules** - Scheduled IVR calls

