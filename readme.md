# Telegram Bot Messaging Automation with Google Sheets

This project automates Telegram bot messaging using Google Sheets. It helps manage, schedule, and archive messages sent to various Telegram groups and channels, with support for text formatting and image attachments.

## Features
- **Automate Telegram bot messaging** via Google Sheets.
- **Schedule messages** for different groups or channels.
- **Archive sent messages** for record-keeping.
- **Support for image attachments** via URLs.
- **Text Formatting** (Markdown support for bold, italic, code, and hyperlinks).
  
## Google Sheet Structure
The Google Sheet consists of three main tabs:

### **1. Notices Tab**
This tab is used to schedule and manage messages before they are sent.

| Message | Groups or Channel | Type (Brothers/Sisters) | Status | Scheduled Date | Image URL (Optional) |
|---------|-------------------|-------------------------|--------|-----------------|----------------------|
| Welcome to our group! | Study Group | Brothers | Pending | 2025-02-16 | (empty) |

### **2. Archive Tab**
This tab stores records of all previously sent messages.

| Message | Groups (comma-separated) | Type (Brothers/Sisters) | Status | Timestamp |
|---------|--------------------------|-------------------------|--------|-----------|
| Welcome to our group! | Study Group | Brothers | Sent | 2025-02-16 10:00 AM |

### **3. Groups Tab**
This tab stores information about Telegram groups and their corresponding IDs.

| Group Name | Group ID |
|------------|----------|
| Study Group | -1001234567890 |

## How It Works
1. **Add messages** to the `Notices` tab, specifying the recipient groups, type, status, and optional image URL.
2. **The Telegram bot reads and processes messages** based on the `Scheduled Date`.
3. **Once sent, the messages move to the `Archive` tab**, recording details such as status and timestamp.
4. **Manage group information** using the `Groups` tab, where each group’s name and Telegram ID are stored.
5. **Text formatting** is supported in Telegram messages using Markdown (e.g., *bold*, _italic_, `code`, and clickable links).

## Setup & Usage
1. Create a Google Sheet with the above structure.
2. **Deploy a Google Apps Script** or connect to a Telegram bot API to automate message sending.
3. Ensure proper authorization for the bot to send messages to the specified groups.
4. Add a custom trigger button in the Google Sheets UI to manually send notices.

## Telegram Bot Integration
Your Telegram bot is powered by the **Telegram Bot API**. You’ll need your own `BOT_TOKEN` to connect the bot to your Google Sheets.

### API Endpoints:
- **Send Message**: `/sendMessage`
- **Send Photo**: `/sendPhoto`

Both text messages and images can be sent to the specified groups or channels.

## Text Formatting (Markdown Support)
Messages sent via the Telegram bot support Markdown formatting. The following formatting styles are supported:

- **Bold**: Use `*text*` to make text bold.
- **Italic**: Use `_text_` to make text italic.
- **Code**: Use ``` `code` ``` to format text as code.
- **Links**: Use `[Link Title](https://example.com)` to create clickable links.

### Example:
```markdown
*Welcome to our group!*
_This is a test message._
Check out the [documentation](https://example.com).
```

The result in Telegram will appear as:
- Welcome to our group! (Bold)
- This is a test message. (Italic)
- [documentation](https://example.com) (Clickable link)

## How to Use
1. **Create a Google Sheet** and structure it as shown above.
2. **Deploy the Google Apps Script** or configure the Telegram bot API with your `BOT_TOKEN`.
3. **Schedule messages** by filling out the `Notices` tab, and the bot will automatically process and send them according to the `Scheduled Date`.
4. **View sent messages** in the `Archive` tab.
5. **Customize group information** in the `Groups` tab.

## Example Script (Google Apps Script)
The provided Google Apps Script will automate the process of reading the messages from the `Notices` tab and sending them to the respective groups. You can deploy the script in your Google Sheet and trigger it manually or automate it further.

```javascript
const BOT_TOKEN = "YOUR_BOT_TOKEN";  // Replace with your bot token

function sendNotices() {
  // Your existing script implementation here
}
```

## Contributions
Contributions are welcome! Feel free to submit issues or pull requests to improve the system.
