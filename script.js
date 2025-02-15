const BOT_TOKEN = "7649730561:AAGA4n_9t_MDd-906kyDMAF00IH6gxN35E0";

function sendNotices() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var noticesSheet = ss.getSheetByName("Notices");
  var archiveSheet = ss.getSheetByName("Archive");
  var groupsSheet = ss.getSheetByName("Groups");

  if (!noticesSheet || !archiveSheet || !groupsSheet) {
    Logger.log("Error: One or more sheets are missing.");
    return;
  }

  var noticesData = noticesSheet.getDataRange().getValues();
  var groupsData = groupsSheet.getDataRange().getValues();

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var groupMap = {};
  for (var i = 1; i < groupsData.length; i++) {
    var groupName = groupsData[i][0]?.toString().trim() || "";
    var groupIds = groupsData[i][1] ? groupsData[i][1].toString().split(",").map(id => id.trim()) : [];

    if (groupName && groupIds.length > 0) {
      groupMap[groupName] = groupIds;
    }
  }

  var apiUrlText = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  var apiUrlPhoto = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
  var toArchive = [];

  for (var i = 1; i < noticesData.length; i++) {
    var message = noticesData[i][0]?.toString().trim() || "";
    var groupNames = noticesData[i][1]?.toString().trim() || "";
    var status = noticesData[i][3]?.toString().trim() || "";
    var scheduledDate = noticesData[i][4];
    var imageUrl = noticesData[i][5]?.toString().trim() || null;

    if (!groupNames || !scheduledDate) {
      Logger.log(`Skipping row ${i + 1}: Missing data.`);
      continue;
    }

    var noticeDate = new Date(scheduledDate);
    noticeDate.setHours(0, 0, 0, 0);

    if (isNaN(noticeDate.getTime())) {
      Logger.log(`Skipping row ${i + 1}: Invalid date format.`);
      continue;
    }

    if (noticeDate.getTime() !== today.getTime()) {
      continue;
    }

    var groupList = groupNames.split(",").map(name => name.trim());
    var allSent = true;

    for (var groupName of groupList) {
      var chatIds = groupMap[groupName];

      if (!chatIds || chatIds.length === 0) {
        Logger.log(`Group ID not found for '${groupName}'`);
        allSent = false;
        continue;
      }

      for (var chatId of chatIds) {
        var directImageUrl = imageUrl && imageUrl.startsWith("http") ? convertDriveLink(imageUrl) : null;

        try {
          if (message && directImageUrl) {
            if (message.length <= 1024) {
              // Send as image with caption
              sendPhoto(chatId, directImageUrl, message);
            } else {
              // Send text first, then image separately
              sendText(chatId, message);
              sendPhoto(chatId, directImageUrl, "");
            }
          } else if (message) {
            // Send only text
            sendText(chatId, message);
          } else if (directImageUrl) {
            // Send only image
            sendPhoto(chatId, directImageUrl, "");
          } else {
            Logger.log(`Skipping row ${i + 1}: No valid content to send.`);
            allSent = false;
          }
        } catch (e) {
          Logger.log(`Error sending message to '${groupName}' (ID: ${chatId}): ${e.message}`);
          allSent = false;
        }
      }
    }

    if (allSent) {
      noticesSheet.getRange(i + 1, 4).setValue("Sent");
      noticesSheet.getRange(i + 1, 6).setValue(new Date());
      toArchive.push(noticesData[i]);
    }
  }

  if (toArchive.length > 0) {
    archiveSheet.insertRowsAfter(archiveSheet.getLastRow() || 1, toArchive.length);
    archiveSheet.getRange(archiveSheet.getLastRow() + 1, 1, toArchive.length, toArchive[0].length).setValues(toArchive);
    noticesSheet.deleteRows(2, toArchive.length);
  }
}

function sendText(chatId, message) {
  var apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  var payload = {
    "chat_id": chatId,
    "text": message,
    "parse_mode": "Markdown"
  };
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  UrlFetchApp.fetch(apiUrl, options);
}

function sendPhoto(chatId, imageUrl, caption) {
  var apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
  var payload = {
    "chat_id": chatId,
    "photo": imageUrl,
    "caption": caption,
    "parse_mode": "Markdown"
  };
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  UrlFetchApp.fetch(apiUrl, options);
}

// Function to convert Google Drive image link to direct Telegram-compatible URL
function convertDriveLink(driveLink) {
  if (driveLink.includes("drive.google.com")) {
    var fileId = driveLink.match(/[-\w]{25,}/);
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId[0]}`;
    }
  }
  return driveLink;
}

// Function to add manual trigger button in Google Sheets
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Telegram Bot")
    .addItem("Send Notices Now", "sendNotices")
    .addToUi();
}
