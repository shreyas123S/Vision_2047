# ngrok Setup - Step by Step Guide

ngrok creates a secure HTTPS tunnel to your local Flask server so Twilio can send webhooks.

## 📋 Prerequisites

- Flask server running on `http://localhost:5000`
- Internet connection

---

## 🪟 Windows Setup

### Step 1: Download ngrok

1. **Go to ngrok website:**
   - Visit: https://ngrok.com/download
   - Or direct link: https://ngrok.com/download/windows

2. **Download:**
   - Click "Download for Windows"
   - Save the ZIP file (e.g., `ngrok-v3-stable-windows-amd64.zip`)

### Step 2: Extract ngrok

1. **Find the downloaded file** (usually in `Downloads` folder)
2. **Right-click** the ZIP file → **Extract All...**
3. **Choose location** (e.g., `C:\ngrok` or `C:\Users\YourName\ngrok`)
4. **Extract**

### Step 3: Add ngrok to PATH (Optional but Recommended)

**Option A: Quick Method (Temporary)**
- Just navigate to the ngrok folder in terminal

**Option B: Add to PATH (Permanent)**
1. **Copy ngrok.exe location** (e.g., `C:\ngrok\ngrok.exe`)
2. **Open System Properties:**
   - Press `Win + R`
   - Type: `sysdm.cpl`
   - Press Enter
3. **Go to Advanced tab** → Click **Environment Variables**
4. **Under "User variables"**, find `Path` → Click **Edit**
5. **Click New** → Paste the folder path (e.g., `C:\ngrok`)
6. **Click OK** on all windows

### Step 4: Sign up for ngrok (Free)

1. **Go to:** https://dashboard.ngrok.com/signup
2. **Sign up** with email (or use Google/GitHub)
3. **Verify your email**
4. **Get your authtoken:**
   - After login, go to: https://dashboard.ngrok.com/get-started/your-authtoken
   - Copy the authtoken (looks like: `2abc123def456ghi789jkl012mno345pq_6r7s8t9u0v1w2x3y4z5`)

### Step 5: Configure ngrok with authtoken

1. **Open Command Prompt or PowerShell:**
   - Press `Win + R`
   - Type: `cmd` or `powershell`
   - Press Enter

2. **Navigate to ngrok folder** (if not in PATH):
   ```cmd
   cd C:\ngrok
   ```
   (Replace with your actual ngrok folder path)

3. **Configure authtoken:**
   ```cmd
   ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
   ```
   Replace `YOUR_AUTHTOKEN_HERE` with the token you copied

   **Example:**
   ```cmd
   ngrok config add-authtoken 2abc123def456ghi789jkl012mno345pq_6r7s8t9u0v1w2x3y4z5
   ```

4. **You should see:** `Authtoken saved to configuration file`

---

## 🚀 Using ngrok

### Step 1: Start Flask Server

1. **Open a terminal/command prompt**
2. **Navigate to backend folder:**
   ```cmd
   cd C:\Users\haris\OneDrive\Pictures\Desktop\kannama\backend
   ```
3. **Start Flask:**
   ```cmd
   python app.py
   ```
4. **Wait for:** `Running on http://0.0.0.0:5000`
5. **Keep this terminal open** (don't close it)

### Step 2: Start ngrok (New Terminal)

1. **Open a NEW terminal/command prompt** (keep Flask running)
2. **Navigate to ngrok folder** (if not in PATH):
   ```cmd
   cd C:\ngrok
   ```
3. **Start ngrok:**
   ```cmd
   ngrok http 5000
   ```
4. **You should see:**
   ```
   ngrok

   Session Status                online
   Account                       Your Name (Plan: Free)
   Version                       3.x.x
   Region                        United States (us)
   Latency                       -
   Web Interface                 http://127.0.0.1:4040
   Forwarding                    https://abc123def456.ngrok.io -> http://localhost:5000

   Connections                   ttl     opn     rt1     rt5     p50     p90
                                 0       0       0.00    0.00    0.00    0.00
   ```

### Step 3: Copy Your HTTPS URL

1. **Look for the "Forwarding" line:**
   ```
   Forwarding    https://abc123def456.ngrok.io -> http://localhost:5000
   ```
2. **Copy the HTTPS URL** (the part before `->`)
   - Example: `https://abc123def456.ngrok.io`
3. **This is your webhook URL!**

### Step 4: Update .env File

1. **Open:** `backend/.env` file
2. **Find this line:**
   ```env
   IVR_CALLBACK_BASE_URL=https://your-ngrok-url.ngrok.io
   ```
3. **Replace with your actual ngrok URL:**
   ```env
   IVR_CALLBACK_BASE_URL=https://abc123def456.ngrok.io
   ```
4. **Save the file**

### Step 5: Configure Twilio Webhook

1. **Go to:** https://console.twilio.com/us1/develop/phone-numbers/manage/incoming
2. **Click on your phone number**
3. **Scroll to "Voice & Fax" section**
4. **In "A CALL COMES IN" field**, enter:
   ```
   https://abc123def456.ngrok.io/api/ivr/webhook
   ```
   (Replace with your actual ngrok URL)
5. **Set HTTP method:** POST
6. **Click "Save"**

---

## ✅ Verify Setup

1. **Check ngrok is running:**
   - Terminal should show "Session Status: online"
   - You should see the forwarding URL

2. **Check Flask is running:**
   - Terminal should show "Running on http://0.0.0.0:5000"

3. **Test webhook:**
   - Go to: http://127.0.0.1:4040 (ngrok web interface)
   - You can see all requests there

---

## 🔄 Daily Usage

Every time you want to use ngrok:

1. **Start Flask:** `cd backend && python app.py`
2. **Start ngrok:** `ngrok http 5000` (in new terminal)
3. **Copy the HTTPS URL** (it changes each time on free plan)
4. **Update `.env` file** with new URL
5. **Update Twilio webhook** with new URL

---

## 💡 Tips

### Free ngrok URLs change every time
- Each time you restart ngrok, you get a new URL
- You need to update `.env` and Twilio webhook each time
- **Solution:** Use ngrok authtoken (free) for stable URLs, or upgrade to paid plan

### Keep ngrok running
- Don't close the ngrok terminal while testing
- If you close it, you'll need to restart and get a new URL

### ngrok Web Interface
- Visit: http://127.0.0.1:4040
- See all HTTP requests in real-time
- Great for debugging!

### Check if ngrok is working
```cmd
curl http://localhost:4040/api/tunnels
```
Should return JSON with your tunnel info.

---

## 🐛 Troubleshooting

### Problem: "ngrok: command not found"
**Solution:** 
- Make sure you're in the ngrok folder, OR
- Add ngrok to PATH (see Step 3 above)

### Problem: "authtoken is required"
**Solution:**
- Run: `ngrok config add-authtoken YOUR_TOKEN`
- Get token from: https://dashboard.ngrok.com/get-started/your-authtoken

### Problem: "address already in use"
**Solution:**
- Port 5000 is already in use
- Either stop the other service, or use different port:
  ```cmd
  ngrok http 5001
  ```
  (And update Flask to run on port 5001)

### Problem: ngrok URL not working
**Solution:**
- Make sure Flask is running on port 5000
- Make sure ngrok is running
- Check both terminals are open
- Try restarting both

### Problem: "Tunnel session failed"
**Solution:**
- Check internet connection
- Make sure authtoken is configured
- Try: `ngrok config add-authtoken YOUR_TOKEN` again

---

## 📝 Quick Reference

```cmd
# Start ngrok
ngrok http 5000

# Configure authtoken (one time)
ngrok config add-authtoken YOUR_TOKEN

# Check ngrok status
# Visit: http://127.0.0.1:4040
```

---

## 🎯 Next Steps

After ngrok is running:

1. ✅ Copy the HTTPS URL from ngrok
2. ✅ Update `backend/.env` file
3. ✅ Update Twilio webhook URL
4. ✅ Restart Flask server
5. ✅ Test the connection!

See `SETUP_CHECKLIST.md` for complete setup checklist.