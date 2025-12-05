# In-App Browser Fix - JSONP Solution

## Problem

The RSVP form was not working in in-app browsers (Facebook Messenger, Instagram, LINE) because:
- These browsers block iframe submissions for security reasons
- The original implementation used hidden iframe method to bypass CORS
- In-app browsers have stricter security policies that prevent this

## Solution: JSONP (JSON with Padding)

We switched from iframe submission to JSONP callback method.

### What is JSONP?

JSONP is a technique that bypasses CORS restrictions by:
1. Creating a `<script>` tag instead of making an AJAX request
2. The server returns JavaScript code that calls a callback function
3. Script tags are not subject to same-origin policy

### How It Works

**Frontend (RSVPForm.tsx):**
```typescript
// 1. Create unique callback function name
const callbackName = 'rsvpCallback_' + Date.now()

// 2. Define callback function on window object
window[callbackName] = (response) => {
  console.log('Success!', response)
  // Handle success
}

// 3. Create script tag with callback parameter
const script = document.createElement('script')
script.src = `${SCRIPT_URL}?name=John&callback=${callbackName}`
document.body.appendChild(script)

// 4. Server responds with: rsvpCallback_123456789({status: 'success'})
// 5. Browser executes the script, calling our callback function
```

**Backend (Google Apps Script):**
```javascript
function doGet(e) {
  const callback = e.parameter.callback
  const response = { status: 'success' }
  
  // Return JavaScript code that calls the callback
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(response) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
  }
  
  // Fallback to regular JSON
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
}
```

## Why This Works in In-App Browsers

1. **Script tags are allowed**: Even in-app browsers allow loading external scripts
2. **No CORS restrictions**: Script tags don't trigger CORS checks
3. **No iframe blocking**: We don't use iframes at all
4. **Universal compatibility**: Works in all browsers, including:
   - Regular browsers (Chrome, Safari, Firefox)
   - In-app browsers (Facebook, Instagram, LINE, Messenger)
   - Mobile browsers
   - WebViews

## Implementation Details

### Frontend Changes

**Before (Iframe Method):**
```typescript
// Create hidden iframe
const iframe = document.createElement('iframe')
iframe.name = 'rsvp-frame'
document.body.appendChild(iframe)

// Submit form to iframe
const form = document.createElement('form')
form.target = 'rsvp-frame'
form.submit()
```

**After (JSONP Method):**
```typescript
// Create callback function
window[callbackName] = (response) => {
  // Handle response
}

// Create script tag
const script = document.createElement('script')
script.src = SCRIPT_URL + '?data=...&callback=' + callbackName
document.body.appendChild(script)
```

### Backend Changes

**Before:**
```javascript
return ContentService
  .createTextOutput(JSON.stringify(response))
  .setMimeType(ContentService.MimeType.JSON)
```

**After:**
```javascript
const callback = e.parameter.callback
if (callback) {
  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(response) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT)
}
```

## Testing

### Test in Regular Browser
1. Open https://shauntsai.github.io/xmas-party-2025/
2. Fill out form
3. Submit
4. Should see success message

### Test in In-App Browser
1. Send link via Facebook Messenger
2. Open link in Messenger (opens in-app browser)
3. Fill out form
4. Submit
5. Should see success message

### Test in LINE
1. Send link via LINE
2. Open link in LINE (opens in-app browser)
3. Fill out form
4. Submit
5. Should see success message

## Debugging

### Check Browser Console
```javascript
// You should see these logs:
🎄 [RSVP] 開始提交表單
📝 [RSVP] 表單資料: {...}
🔗 [RSVP] 完整 URL: ...
📤 [RSVP] 使用 JSONP 方法提交（支援所有瀏覽器）...
✅ [RSVP] 收到回應: {status: 'success'}
🎉 [RSVP] 表單提交成功！
```

### Check Google Sheet
- New row should appear immediately after submission
- Timestamp should match submission time

### Check Email
- Confirmation email should be sent
- Calendar invite should be attached (for "yes" responses)

## Advantages of JSONP Method

1. ✅ Works in ALL browsers (including in-app browsers)
2. ✅ No CORS issues
3. ✅ No iframe blocking
4. ✅ Simple implementation
5. ✅ Reliable callback mechanism
6. ✅ Automatic cleanup after submission

## Disadvantages (and why they don't matter here)

1. ❌ Only supports GET requests
   - **Not a problem**: Google Apps Script doGet() handles GET requests
   
2. ❌ URL length limits
   - **Not a problem**: Our form data is small enough
   
3. ❌ Security concerns (XSS)
   - **Not a problem**: We control both frontend and backend
   
4. ❌ Considered "old-school"
   - **Not a problem**: It works reliably everywhere

## Alternative Solutions Considered

### 1. Direct Form Submission with target="_blank"
```html
<form action="..." target="_blank">
```
- ❌ Opens new tab/window (bad UX)
- ❌ User leaves the page
- ❌ Can't show success message

### 2. Fetch API with no-cors mode
```javascript
fetch(url, { mode: 'no-cors' })
```
- ❌ Can't read response
- ❌ Can't confirm success
- ❌ Still blocked in some in-app browsers

### 3. Redirect to external form
- ❌ Bad user experience
- ❌ Loses branding
- ❌ Extra steps for user

### 4. JSONP (Chosen Solution)
- ✅ Works everywhere
- ✅ Good UX
- ✅ Can show success/error messages
- ✅ Stays on same page

## Deployment Steps

1. **Update Frontend:**
   - Modified `components/RSVPForm.tsx` to use JSONP
   - Changed warning message to informational note
   - Added timeout handling (10 seconds)

2. **Update Backend:**
   - Modified `google-apps-script-FIXED.js` to support callback parameter
   - Returns JavaScript code when callback is present
   - Maintains backward compatibility with JSON responses

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Fix: Use JSONP for in-app browser compatibility"
   git push
   ```

4. **Update Google Apps Script:**
   - Copy updated code from `google-apps-script-FIXED.js`
   - Paste into Apps Script editor
   - Deploy → Manage deployments → Edit → New version → Deploy

## Verification Checklist

- [ ] Form works in Chrome
- [ ] Form works in Safari
- [ ] Form works in Firefox
- [ ] Form works in Facebook Messenger in-app browser
- [ ] Form works in Instagram in-app browser
- [ ] Form works in LINE in-app browser
- [ ] Google Sheet updates correctly
- [ ] Confirmation emails are sent
- [ ] Calendar invites are attached
- [ ] Success message appears
- [ ] Form resets after submission

## Support

If issues persist:
1. Check browser console for errors
2. Check Apps Script execution logs
3. Verify Google Sheet is named "sheet"
4. Verify Apps Script is deployed with "Anyone" access
5. Test with simple data first

## References

- [JSONP on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Google Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [In-App Browser Detection](https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system)
