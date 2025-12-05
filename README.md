# 🎄 Christmas Housewarming Party 2025

A beautiful, animated invitation landing page with RSVP functionality.

## Features

- ✨ Smooth animations with Framer Motion
- ❄️ Falling snowflakes effect
- ⏰ Live countdown timer
- 📝 RSVP form with Google Sheets integration
- 📱 Fully responsive (mobile-first)
- 🎨 Beautiful gradient backgrounds
- 🎁 Interactive hover effects

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Apps Script (backend)

## Setup Instructions

### 1. Install Dependencies

```bash
cd xmas-party-2025
npm install
```

### 2. Set Up Google Sheets Backend

#### Create Google Sheet:
1. Create a new Google Sheet
2. Name it "Christmas Party RSVPs 2025"
3. Add these column headers in Row 1:
   ```
   Timestamp | Name | Invited By | Email | Attendance | Arrival Time | Departure Time | Dietary Restrictions | Plus One | Plus One Name | Notes | Follow-up Needed
   ```

#### Deploy Apps Script:
1. In your Google Sheet: Extensions → Apps Script
2. Delete any existing code
3. Copy the entire content from `google-apps-script.js`
4. Paste it into the Apps Script editor
5. Click "Deploy" → "New deployment"
6. Choose type: "Web app"
7. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click "Deploy"
9. Copy the Web App URL (looks like: `https://script.google.com/macros/s/...`)

#### Update Frontend:
1. Open `components/RSVPForm.tsx`
2. Find line: `const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'`
3. Replace with your actual Web App URL

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Deploy to GitHub Pages

#### Update Repository Name:
1. Open `next.config.js`
2. Update `basePath` to match your repo name:
   ```js
   basePath: '/your-repo-name'
   ```

#### Build and Deploy:
```bash
# Build the static site
npm run build

# The output will be in the 'out' folder
# Push this to gh-pages branch
```

#### Using GitHub Actions (Recommended):

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

Then:
1. Push to GitHub
2. Go to repo Settings → Pages
3. Set source to "gh-pages" branch
4. Your site will be live at: `https://yourusername.github.io/xmas-party-2025`

## Customization

### Update Party Details:
- Edit `components/Hero.tsx` for date/time
- Edit `components/Details.tsx` for location and other info
- Edit `components/Hosts.tsx` to change host names/emojis

### Change Colors:
- Edit `tailwind.config.ts` to modify the color scheme
- Current theme: Christmas red, green, and gold

### Modify Form Fields:
- Edit `components/RSVPForm.tsx` to add/remove fields
- Update `google-apps-script.js` to match new fields

## Testing

### Test RSVP Form:
1. Fill out the form on your local site
2. Check your Google Sheet for the new entry
3. Check email (if provided) for confirmation

### Test Apps Script:
1. In Apps Script editor, run the `testScript()` function
2. Check Execution log for results
3. Verify test data appears in your sheet

## Troubleshooting

### RSVP not submitting:
- Check browser console for errors
- Verify Apps Script URL is correct
- Ensure Apps Script is deployed with "Anyone" access
- Check Google Sheet permissions

### Snowflakes not showing:
- Clear browser cache
- Check if JavaScript is enabled
- Try different browser

### Build errors:
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check Node.js version (should be 18+)

## Support

For issues or questions, contact:
- Shaun
- Joshua
- Kris

---

Made with ❤️ for our Christmas Housewarming Party 2025 🎄
