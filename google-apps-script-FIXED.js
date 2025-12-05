/**
 * Google Apps Script for RSVP Form
 * 完整版本 - 直接複製全部內容到 Apps Script 編輯器
 */

function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName('sheet') || 
                spreadsheet.getSheetByName('Sheet') || 
                spreadsheet.getSheetByName('SHEET') ||
                spreadsheet.getActiveSheet();
    
    Logger.log('Using sheet: ' + sheet.getName());
    
    const params = e.parameter;
    const timestamp = new Date();
    const row = [
      timestamp,
      params.name || '',
      params.invitedBy || '',
      params.email || '',
      params.attendance || '',
      params.arrivalTime || '',
      params.departureTime || '',
      params.dietaryRestrictions || '',
      params.plusOne || '',
      params.plusOneName || '',
      params.notes || '',
      'Pending'
    ];
    
    sheet.appendRow(row);
    
    if (params.email) {
      sendConfirmationEmail(params);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'RSVP recorded successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName('sheet') || 
                spreadsheet.getSheetByName('Sheet') || 
                spreadsheet.getSheetByName('SHEET') ||
                spreadsheet.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const timestamp = new Date();
    const row = [
      timestamp,
      data.name,
      data.invitedBy,
      data.email || '',
      data.attendance,
      data.arrivalTime || '',
      data.departureTime || '',
      data.dietaryRestrictions || '',
      data.plusOne,
      data.plusOneName || '',
      data.notes || '',
      'Pending'
    ];
    
    sheet.appendRow(row);
    
    if (data.email) {
      sendConfirmationEmail(data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'RSVP recorded successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(data) {
  try {
    const subject = '🎄 RSVP確認 - 聖誕喬遷派對！';
    let body = '嗨 ' + data.name + '！\n\n';
    
    if (data.attendance === 'yes') {
      body += '感謝你確認參加我們的聖誕喬遷派對！🎉\n\n';
      body += '📅 日期：2025年12月25日\n';
      body += '🕐 時間：下午1點開始\n';
      body += '📍 地點：桃園市龜山區文化一路668號19樓之六\n\n';
      
      if (data.arrivalTime) {
        body += '我們已記錄你預計 ' + data.arrivalTime + ' 到達。\n\n';
      }
      
      if (data.plusOne === 'yes') {
        body += '期待見到' + (data.plusOneName || '你的朋友') + '！\n\n';
      }
      
      body += '派對見！\n\n';
    } else if (data.attendance === 'maybe') {
      body += '感謝讓我們知道！希望你能來參加。🤞\n\n';
    } else {
      body += '感謝讓我們知道。很遺憾你無法參加！😢\n\n';
      body += '希望之後能見到你！\n\n';
    }
    
    body += '祝好，\n';
    body += 'Shaun, Joshua & Kris\n\n';
    body += 'P.S. 如需更新回覆，請再次填寫表單或直接聯絡我們。';
    
    MailApp.sendEmail(data.email, subject, body);
  } catch (error) {
    Logger.log('Email error: ' + error);
  }
}

function testScript() {
  const testData = {
    parameter: {
      name: '測試用戶',
      invitedBy: 'Shaun',
      email: 'test@example.com',
      attendance: 'yes',
      arrivalTime: '14:00',
      departureTime: '18:00',
      dietaryRestrictions: '素食',
      plusOne: 'yes',
      plusOneName: '測試賓客',
      notes: '很期待！'
    }
  };
  
  const result = doGet(testData);
  Logger.log(result.getContent());
}
