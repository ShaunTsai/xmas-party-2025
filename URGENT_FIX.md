# 🚨 緊急修正：Sheet 名稱問題

## 問題
表單有提交，但資料沒有寫入 Google Sheet，因為 Apps Script 找不到正確的 sheet。

## 解決方法（5分鐘）

### 步驟 1: 更新 Apps Script

1. 打開你的 Google Sheet
2. 點擊 **擴充功能 → Apps Script**
3. **刪除所有現有程式碼**
4. 打開 `google-apps-script.js` 檔案
5. **複製全部內容**
6. **貼到 Apps Script 編輯器**
7. 點擊 **💾 儲存**

### 步驟 2: 重新部署

1. 點擊 **部署 → 管理部署**
2. 點擊現有部署旁的 **✏️ 編輯**
3. 點擊 **版本** 下拉選單
4. 選擇 **新版本**
5. 點擊 **部署**
6. 完成！（URL 保持不變）

### 步驟 3: 測試

1. 回到網站 http://localhost:3000
2. 重新整理頁面（Cmd+R）
3. 填寫表單並提交
4. **檢查 Google Sheet** - 應該會有新資料了！

## 改變了什麼？

**之前：**
```javascript
const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
```
→ 只會寫入「活動中」的 sheet

**現在：**
```javascript
let sheet = spreadsheet.getSheetByName('sheet') || 
            spreadsheet.getSheetByName('Sheet') || 
            spreadsheet.getSheetByName('SHEET') ||
            spreadsheet.getActiveSheet();
```
→ 會嘗試找名為 "sheet" 的 sheet（不分大小寫）

## 如果還是不行

### 檢查 Sheet 名稱
1. 在 Google Sheet 底部查看 tab 名稱
2. 如果不是 "sheet"、"Sheet" 或 "SHEET"
3. 告訴我實際的名稱，我會更新程式碼

### 或者改名
最簡單的方法：
1. 在 Google Sheet 底部
2. 右鍵點擊 sheet tab
3. 選擇「重新命名」
4. 改成 **"sheet"**（小寫）
5. 完成！

---

**更新後記得重新部署！** 🚀
