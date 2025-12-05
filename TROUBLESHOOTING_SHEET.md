# Google Sheet Not Updating - Troubleshooting Guide

## ✅ IN-APP BROWSER FIX APPLIED

**Good news!** The form now uses JSONP method which works in ALL browsers, including:
- Facebook Messenger in-app browser
- Instagram in-app browser
- LINE in-app browser
- Regular browsers (Chrome, Safari, Firefox)

See `IN_APP_BROWSER_FIX.md` for technical details.

## Quick Checks

### 1. Check Apps Script Deployment
The most common issue is that the Apps Script needs to be **redeployed** after making changes.

**Steps:**
1. Open your Google Apps Script: https://script.google.com
2. Find your "聖誕派對 RSVP" project
3. Click **Deploy** → **Manage deployments**
4. Click the **pencil icon** (Edit) on your current deployment
5. Under "Version", select **New version**
6. Click **Deploy**
7. Copy the new Web app URL (should still be the same)

### 2. Verify Script URL
Current URL in the form:
```
https://script.google.com/macros/s/AKfycbyw-_KlOuFPASNsGBe34P2gxoaqkWawNPfkvnpOPOj9oVmpynJOhd04ixcZGSMEZM8hIw/exec
```

Make sure this matches your deployed Apps Script URL.

### 3. Check Sheet Name
The script looks for a sheet named **"sheet"** (lowercase).

**Verify:**
1. Open your Google Sheet
2. Check the tab name at the bottom
3. It should be exactly: `sheet` (all lowercase)
4. If it's different, either:
   - Rename the sheet to "sheet", OR
   - Update the script to match your sheet name

### 4. Test the Script Directly

**Option A: Use the test function**
1. Open Apps Script
2. Select `testScript` function from dropdown
3. Click **Run**
4. Check if a test entry appears in your sheet

**Option B: Test via URL**
Open this URL in your browser (replace with your actual URL):
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?name=Test&invitedBy=Shaun&email=test@test.com&attendance=yes&arrivalTime=14:00&departureTime=18:00&dietaryRestrictions=none&plusOne=no&plusOneName=&notes=test
```

### 5. Check Browser Console
When you submit the form on the website:
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Submit the form
4. Look for these messages:
   - 🎄 [RSVP] 開始提交表單
   - 📝 [RSVP] 表單資料: {...}
   - ✅ [RSVP] 表單已提交到 iframe

### 6. Check Apps Script Logs
1. Open your Apps Script
2. Click **Executions** (clock icon on left)
3. Look for recent executions
4. Check if there are any errors

## Common Issues & Solutions

### Issue 1: "Sheet not found"
**Solution:** Make sure your sheet tab is named exactly "sheet" (lowercase)

### Issue 2: Script not executing
**Solution:** Redeploy the script with a new version (see step 1 above)

### Issue 3: Permission errors
**Solution:** 
1. Go to Apps Script
2. Click **Run** on any function
3. Grant permissions when prompted
4. Redeploy

### Issue 4: CORS errors (shouldn't happen with iframe method)
**Solution:** The iframe method should bypass CORS. If you see CORS errors, the script might not be deployed correctly.

### Issue 5: Data appears but in wrong format
**Solution:** Check that the script's column order matches your sheet headers

## Current Script Configuration

**Expected Sheet Structure:**
| Timestamp | Name | Invited By | Email | Attendance | Arrival Time | Departure Time | Dietary Restrictions | Plus One | Plus One Name | Notes |
|-----------|------|------------|-------|------------|--------------|----------------|---------------------|----------|---------------|-------|

**Script URL:** 
```
https://script.google.com/macros/s/AKfycbyw-_KlOuFPASNsGBe34P2gxoaqkWawNPfkvnpOPOj9oVmpynJOhd04ixcZGSMEZM8hIw/exec
```

## Testing Steps

1. **Test with simple data:**
   - Name: "測試"
   - Invited By: "Shaun"
   - Attendance: "yes"
   - Leave other fields empty

2. **Check immediately after submission:**
   - Open Google Sheet
   - Refresh the page
   - Look for new row

3. **If still not working:**
   - Share your Apps Script execution logs
   - Share any browser console errors
   - Verify the sheet name is exactly "sheet"

## Need More Help?

If none of these work, check:
1. Apps Script execution logs for errors
2. Browser console for JavaScript errors
3. Make sure the Google Sheet and Apps Script are in the same Google account
4. Verify the Apps Script has permission to access the sheet

## Quick Fix: Redeploy Script

**This fixes 90% of issues:**

1. Open Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (pencil icon)
4. Change version to **New version**
5. Click **Deploy**
6. Done!

The URL stays the same, but the script will now use the latest code.
