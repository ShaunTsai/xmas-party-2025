# 🎄 Quick Start - Christmas Party Invitation

## What You Just Got:

A fully-featured, animated party invitation website with:

✨ **Fancy Features:**
- Falling snowflakes animation
- Smooth page transitions (Framer Motion)
- Live countdown timer to Dec 25
- Interactive RSVP form
- Mobile-responsive design
- Christmas-themed colors and effects

📊 **Backend:**
- Google Sheets integration for RSVP tracking
- Auto-confirmation emails
- Real-time data sync

🚀 **Deployment:**
- GitHub Pages ready
- Static export (fast loading)
- Free hosting

---

## Next Steps:

### 1. Install Dependencies
```bash
cd xmas-party-2025
npm install
```

### 2. Set Up Google Sheet
Follow `SETUP_GUIDE.md` - Section "Step 2"
- Takes ~10 minutes
- Creates your RSVP tracking sheet
- Connects form to sheet

### 3. Test Locally
```bash
npm run dev
```
Open http://localhost:3000

### 4. Deploy
Push to GitHub → Auto-deploys via GitHub Actions

---

## File Structure:

```
xmas-party-2025/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Layout wrapper
│   └── globals.css       # Global styles
├── components/
│   ├── Hero.tsx          # Hero section with title
│   ├── Countdown.tsx     # Live countdown timer
│   ├── Hosts.tsx         # Host profiles (you 3)
│   ├── Details.tsx       # Party details
│   ├── RSVPForm.tsx      # RSVP form (⚠️ UPDATE SCRIPT_URL HERE)
│   └── Snowfall.tsx      # Snowflake animation
├── google-apps-script.js # Backend code (paste in Google Sheets)
├── SETUP_GUIDE.md        # Detailed setup instructions
└── README.md             # Full documentation
```

---

## Important: Update These Files

### 1. `components/RSVPForm.tsx` (Line 20)
```typescript
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
// ↑ Replace with your actual Apps Script URL
```

### 2. `next.config.js` (Line 3)
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/xmas-party-2025' : '',
// ↑ Change '/xmas-party-2025' to your actual repo name
```

### 3. `components/Details.tsx` (Optional)
Update location, address, and party details

---

## Customization Ideas:

### Change Host Info:
Edit `components/Hosts.tsx`:
```typescript
const hosts = [
  { name: 'Shaun', emoji: '👨‍💻', color: 'from-blue-500 to-purple-500' },
  { name: 'Joshua', emoji: '🎸', color: 'from-green-500 to-teal-500' },
  { name: 'Kris', emoji: '🎨', color: 'from-pink-500 to-rose-500' },
]
```

### Change Colors:
Edit `tailwind.config.ts`:
```typescript
colors: {
  christmas: {
    red: '#C41E3A',    // Change these
    green: '#165B33',
    gold: '#FFD700',
  },
}
```

### Add More Form Fields:
1. Edit `components/RSVPForm.tsx` - add field to form
2. Edit `google-apps-script.js` - add to row array
3. Add column to Google Sheet

---

## Google Sheet Column Headers:

Copy-paste this into Row 1 of your Google Sheet:

```
Timestamp	Name	Invited By	Email	Attendance	Arrival Time	Departure Time	Dietary Restrictions	Plus One	Plus One Name	Notes	Follow-up Needed
```

---

## Troubleshooting:

**Form not submitting?**
- Check Apps Script URL in `RSVPForm.tsx`
- Verify Apps Script has "Anyone" access
- Check browser console (F12) for errors

**Build errors?**
```bash
rm -rf node_modules .next
npm install
npm run build
```

**Animations not working?**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)
- Clear browser cache

---

## Commands:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

---

## Support:

Read the full guides:
- `SETUP_GUIDE.md` - Step-by-step setup
- `README.md` - Complete documentation

---

**Total setup time: ~30 minutes**

Have fun with your party! 🎉🎄
