# 🔧 如何除錯 RSVP 表單

## 步驟 1: 使用測試頁面

1. 打開 `TEST_FORM.html` 在瀏覽器中
2. 按 F12 打開開發者工具
3. 點擊「測試 URL」按鈕
4. 查看結果

## 步驟 2: 檢查 Google Apps Script

### 最常見的 3 個問題：

#### 問題 1: 部署設定錯誤 ❌
**症狀：** 403 Forbidden 或 Authorization required

**解決方法：**
1. 打開 Google Apps Script
2. 點擊「部署」→「管理部署」
3. 點擊 ✏️ 編輯
4. 確認：
   - 執行身分：**我（你的 email）**
   - 存取權限：**任何人**
5. 點擊「部署」

#### 問題 2: Sheet 欄位不對 ❌
**症狀：** 資料沒有出現在 Sheet 中

**解決方法：**
1. 打開你的 Google Sheet
2. 確認第一行（Row 1）有這些欄位：

```
Timestamp | Name | Invited By | Email | Attendance | Arrival Time | Departure Time | Dietary Restrictions | Plus One | Plus One Name | Notes | Follow-up Needed
```

**複製貼上這行到你的 Sheet 第一行：**
```
Timestamp	Name	Invited By	Email	Attendance	Arrival Time	Departure Time	Dietary Restrictions	Plus One	Plus One Name	Notes	Follow-up Needed
```

#### 問題 3: URL 錯誤 ❌
**症狀：** 404 Not Found

**解決方法：**
確認 URL 格式：
- ✅ 正確：`https://script.google.com/macros/s/.../exec`
- ❌ 錯誤：`https://script.google.com/macros/s/.../dev`

## 步驟 3: 測試 Apps Script

在 Apps Script 編輯器中：

1. 選擇函數：`testScript`
2. 點擊「執行」▶️
3. 查看「執行記錄」

**應該看到：**
```
{"status":"success","message":"RSVP recorded successfully!"}
```

**如果看到錯誤：**
- 檢查 Sheet 名稱
- 檢查欄位順序
- 檢查權限

## 步驟 4: 前端除錯

### 打開瀏覽器 Console（F12）

1. 前往 http://localhost:3000
2. 按 F12
3. 切換到「Console」標籤
4. 填寫表單並提交

**應該看到：**
```
🎄 [RSVP] 開始提交表單
📝 [RSVP] 表單資料: {...}
🔗 [RSVP] 完整 URL: ...
📤 [RSVP] 發送請求...
✅ [RSVP] 請求完成
🎉 [RSVP] 表單提交成功！
💡 [RSVP] 請檢查 Google Sheet 是否有新資料
```

## 步驟 5: 驗證資料

1. 打開 Google Sheet
2. 按 Ctrl+R（或 Cmd+R）重新整理
3. 檢查是否有新的一行資料

## 常見錯誤訊息

### "CORS error" 或 "Opaque response"
**這是正常的！** 
- Google Apps Script 不回傳 CORS headers
- 但資料應該還是有送出
- 檢查 Google Sheet 確認

### "Failed to fetch"
**可能原因：**
- 網路問題
- URL 錯誤
- Apps Script 未部署

**解決方法：**
1. 檢查網路連線
2. 確認 URL 正確
3. 重新部署 Apps Script

### "TypeError: Failed to execute 'fetch'"
**可能原因：**
- URL 格式錯誤
- 參數編碼問題

**解決方法：**
- 使用 `TEST_FORM.html` 測試
- 檢查 Console 的完整 URL

## 快速測試指令

在瀏覽器 Console 貼上：

```javascript
// 測試 1: 簡單測試
fetch('https://script.google.com/macros/s/AKfycbyw-_KlOuFPASNsGBe34P2gxoaqkWawNPfkvnpOPOj9oVmpynJOhd04ixcZGSMEZM8hIw/exec?name=測試&invitedBy=Shaun&attendance=yes')
  .then(r => console.log('✅ Success!', r.status))
  .catch(e => console.error('❌ Error:', e))

// 測試 2: 完整資料
const params = new URLSearchParams({
  name: '測試用戶',
  invitedBy: 'Shaun',
  attendance: 'yes'
});
fetch('https://script.google.com/macros/s/AKfycbyw-_KlOuFPASNsGBe34P2gxoaqkWawNPfkvnpOPOj9oVmpynJOhd04ixcZGSMEZM8hIw/exec?' + params.toString())
  .then(r => console.log('✅ 完整測試成功!', r))
  .catch(e => console.error('❌ 錯誤:', e))
```

## 還是不行？

### 檢查 Apps Script 執行記錄

1. Apps Script 編輯器
2. 左側：「執行作業」
3. 查看最近的執行
4. 點擊查看詳細錯誤

### 重新開始

如果以上都試過了：

1. **重新部署 Apps Script：**
   - 部署 → 管理部署
   - 刪除現有部署
   - 新增部署 → Web 應用程式
   - 重新設定權限

2. **更新前端 URL：**
   - 複製新的 Web App URL
   - 更新 `components/RSVPForm.tsx` 中的 `SCRIPT_URL`

3. **清除快取：**
   - Ctrl+Shift+Delete（或 Cmd+Shift+Delete）
   - 清除瀏覽器快取
   - 重新載入頁面

---

## 成功的標誌 ✅

當一切正常時，你應該看到：

1. **前端：** 綠色成功訊息「✅ 回覆已送出！派對見！」
2. **Console：** 一系列 🎄 [RSVP] 的 log 訊息
3. **Google Sheet：** 新的一行資料
4. **Email：** 確認信（如果有填 email）

祝除錯順利！🎄
