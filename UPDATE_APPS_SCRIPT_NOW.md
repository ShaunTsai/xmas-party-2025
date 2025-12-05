# 🚨 URGENT: Update Your Google Apps Script

## What Changed?

The form now uses **JSONP method** to work in in-app browsers (Messenger, Instagram, LINE).

## Steps to Update (5 minutes)

### 1. Open Your Apps Script
Go to: https://script.google.com

Find your project: **"聖誕派對 RSVP"**

### 2. Copy the New Code
Open the file: `google-apps-script-FIXED.js` in this project

Copy ALL the code (Ctrl+A, Ctrl+C)

### 3. Paste into Apps Script
1. Select all existing code in Apps Script (Ctrl+A)
2. Paste the new code (Ctrl+V)
3. Click **Save** (💾 icon)

### 4. Deploy New Version
1. Click **Deploy** → **Manage deployments**
2. Click the **pencil icon** (✏️ Edit) next to your deployment
3. Under "Version", select **New version**
4. Click **Deploy**
5. Click **Done**

### 5. Test It!
1. Open your website: https://shauntsai.github.io/xmas-party-2025/
2. Fill out the form
3. Submit
4. Check Google Sheet for new entry
5. Check email for confirmation

## What's Different?

### Old Code (Iframe Method)
```javascript
return ContentService
  .createTextOutput(JSON.stringify(response))
  .setMimeType(ContentService.MimeType.JSON);
```

### New Code (JSONP Method)
```javascript
const callback = e.parameter.callback;
if (callback) {
  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(response) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
```

## Why This Matters

**Before:** Form didn't work in Messenger/Instagram/LINE

**After:** Form works EVERYWHERE! 🎉

## Testing Checklist

Test in these browsers:
- [ ] Chrome (regular browser)
- [ ] Safari (regular browser)
- [ ] Facebook Messenger (in-app browser)
- [ ] Instagram (in-app browser)
- [ ] LINE (in-app browser)

All should work now!

## Need Help?

If something doesn't work:
1. Make sure you deployed a **New version** (step 4)
2. Check the Apps Script URL is still the same
3. Clear browser cache and try again
4. Check browser console for errors (F12)

## Verification

After updating, you should see in browser console:
```
🎄 [RSVP] 開始提交表單
📤 [RSVP] 使用 JSONP 方法提交（支援所有瀏覽器）...
✅ [RSVP] 收到回應: {status: 'success'}
🎉 [RSVP] 表單提交成功！
```

## Done! 🎊

Your form now works in all browsers, including in-app browsers!
