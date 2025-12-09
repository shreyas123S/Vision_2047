# 🚀 START HERE - Twilio Setup

## Quick Setup (3 Steps)

### Step 1: Create `.env` File
1. Go to `backend/` folder
2. Copy `env.example` file
3. Rename it to `.env`
4. Open `.env` in a text editor

### Step 2: Enter Your Twilio Credentials
In the `.env` file, find and replace these 3 lines:

```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here  
TWILIO_PHONE_NUMBER=+1234567890
```

**Get your credentials from:** https://console.twilio.com/

### Step 3: Setup ngrok & Update Webhook
1. **Install ngrok:** https://ngrok.com/download
2. **Start Flask:** `cd backend && python app.py`
3. **Run ngrok:** `ngrok http 5000` (in new terminal)
4. **Copy HTTPS URL** (e.g., `https://abc123.ngrok.io`)
5. **Update `.env`:** Replace `IVR_CALLBACK_BASE_URL` with your ngrok URL
6. **Configure Twilio:** 
   - Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
   - Click your phone number
   - Enter: `https://YOUR-NGROK-URL.ngrok.io/api/ivr/webhook`
   - Method: POST
   - Save

## 📁 File Location
**All credentials go in:** `backend/.env`

## 📖 More Details
- **Quick Reference:** `backend/WHERE_TO_PUT_CREDENTIALS.txt`
- **Detailed Guide:** `backend/CREDENTIALS_SETUP.md`
- **Checklist:** `backend/SETUP_CHECKLIST.md`

## ✅ Done!
Restart Flask server and test!

