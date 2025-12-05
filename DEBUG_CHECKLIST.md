# 🔍 Google Apps Script 除錯清單

## 最常見的問題：

### 1. ✅ 檢查 Apps Script 部署設定
在 Google Apps Script 編輯器中：
- 點擊「部署」→「管理部署」
- 確認設定：
  - **執行身分：** 我（你的 email）
  - **存取權限：** 任何人

### 2. ✅ 檢查 Google Sheet 欄位
確認 Sheet 的第一行有這些欄位（順序要對）：
```
Timestamp | Name | Invited By | Email | Attendance | Arrival Time | Departure Time | Dietary Restrictions | Plus One | Plus One Name | Notes | Follow-up Needed
```

### 3. ✅ 測試 Apps Script
在 Apps Script 編輯器中：
1. 選擇函數：`testScript`
2. 點擊「執行」
3. 查看「執行記錄」是否有錯誤

### 4. ✅ 檢查 URL
確認你的 Apps Script URL：
- 應該以 `/exec` 結尾
- 不是 `/dev`
- 格式：`https://script.google.com/macros/s/...../exec`

### 5. ✅ 重新部署
如果以上都正確，試試重新部署：
1. 部署 → 管理部署
2. 點擊現有部署旁的 ✏️
3. 版本 → 新版本
4. 部署

## 前端除錯步驟：

### 打開瀏覽器 Console（F12）
1. 填寫表單
2. 點擊送出
3. 查看 Console 的錯誤訊息

### 常見錯誤訊息：

**CORS Error:**
- 這是正常的！因為 Apps Script 不回傳 CORS headers
- 但資料應該還是有送出

**Network Error:**
- 檢查網路連線
- 檢查 Apps Script URL 是否正確

**403 Forbidden:**
- Apps Script 權限設定錯誤
- 重新設定「存取權限」為「任何人」

## 測試方法：

### 方法 1：直接測試 Apps Script URL
在瀏覽器網址列貼上：
```
https://script.google.com/macros/s/AKfycbyw-_KlOuFPASNsGBe34P2gxoaqkWawNPfkvnpOPOj9oVmpynJOhd04ixcZGSMEZM8hIw/exec?name=測試&invitedBy=Shaun&attendance=yes
```

應該會：
1. 重新導向到一個頁面
2. Google Sheet 出現新的一行

### 方法 2：檢查 Google Sheet
1. 打開你的 RSVP Google Sheet
2. 提交表單後
3. 重新整理 Sheet
4. 看是否有新資料

## 如果還是不行：

### 檢查 Apps Script 執行記錄
1. Apps Script 編輯器
2. 左側選單：「執行作業」
3. 查看最近的執行記錄
4. 看是否有錯誤訊息

### 常見 Apps Script 錯誤：

**"Cannot read property 'parameter' of undefined"**
- GET 請求沒有收到參數
- 檢查前端是否正確發送

**"Exception: Service invoked too many times"**
- API 配額用完
- 等待一段時間後再試

**"Authorization required"**
- 需要重新授權
- 重新部署並授權

---

## 快速測試指令：

在瀏覽器 Console 執行：
```javascript
fetch('https://script.google.com/macros/s/AKfycbyw-_KlOuFPASNsGBe34P2gxoaqkWawNPfkvnpOPOj9oVmpynJOhd04ixcZGSMEZM8hIw/exec?name=測試&invitedBy=Shaun&attendance=yes')
  .then(r => console.log('Success!', r))
  .catch(e => console.error('Error:', e))
```
