# 🚀 Quick Setup Guide

## Step 1: Install Dependencies (5 min)

```bash
cd xmas-party-2025
npm install
```

## Step 2: Set Up Google Sheet (10 min)

### Create the Sheet:
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new sheet: "Christmas Party RSVPs 2025"
3. In Row 1, paste these column headers:

```
Timestamp	Name	Invited By	Email	Attendance	Arrival Time	Departure Time	Dietary Restrictions	Plus One	Plus One Name	Notes	Follow-up Needed
```

### Deploy Apps Script:
1. In your sheet: **Extensions → Apps Script**
2. Delete default code
3. Copy ALL code from `google-apps-script.js`
4. Paste into Apps Script editor
5. Click **💾 Save** (name it "RSVP Handler")
6. Click **Deploy → New deployment**
7. Click ⚙️ gear icon → Select **Web app**
8. Configure:
   - Description: "RSVP Form Handler"
   - Execute as: **Me (your email)**
   - Who has access: **Anyone**
9. Click **Deploy**
10. Click **Authorize access** (approve permissions)
11. **COPY THE WEB APP URL** (looks like `https://script.google.com/macros/s/ABC123.../exec`)

### Update Frontend:
1. Open `components/RSVPForm.tsx`
2. Find line 20: `const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'`
3. Replace with your copied URL:
   ```typescript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec'
   ```
4. Save the file

## Step 3: Test Locally (2 min)

```bash
npm run dev
```

Open http://localhost:3000

Test the RSVP form:
1. Fill out the form
2. Submit
3. Check your Google Sheet - new row should appear!

## Step 4: Deploy to GitHub Pages (10 min)

### Option A: Automatic (Recommended)

1. Create new GitHub repo: `xmas-party-2025`
2. Initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/xmas-party-2025.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repo **Settings → Pages**
   - Source: **GitHub Actions**
   - The workflow will auto-deploy on push!

4. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/xmas-party-2025
   ```

### Option B: Manual

```bash
npm run build
# Upload the 'out' folder to your hosting
```

## Step 5: Customize (Optional)

### Update Party Info:
- `components/Hero.tsx` - Date, time, title
- `components/Details.tsx` - Location, what to expect
- `components/Hosts.tsx` - Host names and emojis

### Change Colors:
- `tailwind.config.ts` - Modify color scheme

### Update Countdown:
- `components/Countdown.tsx` - Line 13: Change target date

## Troubleshooting

### "RSVP not submitting"
✅ Check Apps Script URL is correct in `RSVPForm.tsx`
✅ Verify Apps Script deployment has "Anyone" access
✅ Check browser console for errors (F12)

### "Build fails"
```bash
rm -rf node_modules .next
npm install
npm run build
```

### "Snowflakes not showing"
✅ Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
✅ Check JavaScript is enabled

## Need Help?

Contact Shaun, Joshua, or Kris!

---

## What You Get:

✨ Beautiful animated landing page
❄️ Falling snowflakes
⏰ Live countdown to party
📝 RSVP form → Google Sheets
📱 Mobile responsive
🎁 Interactive effects
📧 Auto-confirmation emails (optional)

**Total setup time: ~30 minutes**

Enjoy! 🎄
