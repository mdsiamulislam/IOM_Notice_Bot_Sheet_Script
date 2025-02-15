# Telegram Bot Messaging Automation with Google Sheets

This project automates Telegram bot messaging using Google Sheets. The sheet consists of three tabs that help manage, schedule, and archive messages sent to various Telegram groups and channels.

## Features
- Automate Telegram bot messaging via Google Sheets.
- Schedule messages for different groups or channels.
- Archive sent messages for record-keeping.
- Support for image attachments via URLs.

## Google Sheet Structure
The Google Sheet consists of three main tabs:

### **1. Notices Tab**
This tab is used to schedule and manage messages before they are sent.

| Message | Groups or Channel | Type (Brothers/Sisters) | Status | Scheduled Date | Image URL (Optional) |
|---------|------------------|------------------------|--------|---------------|----------------------|
| Welcome to our group! | Study Group | Brothers | Pending | 2025-02-16 | (empty) |

### **2. Archive Tab**
This tab stores records of all previously sent messages.

| Message | Groups (comma-separated) | Type (Brothers/Sisters) | Status | Timestamp |
|---------|-------------------------|------------------------|--------|----------|
| Welcome to our group! | Study Group | Brothers | Sent | 2025-02-16 10:00 AM |

### **3. Groups Tab**
This tab stores information about Telegram groups and their corresponding IDs.

| Group Name | Group ID |
|------------|---------|
| Study Group | -1001234567890 |

## How It Works
1. **Add messages** to the `Notices` tab, specifying the recipient groups, type, status, and optional image URL.
2. **The Telegram bot reads and processes messages** based on the `Scheduled Date`.
3. **Once sent, the messages move to the `Archive` tab**, recording details such as status and timestamp.
4. **Manage group information** using the `Groups` tab, where each group’s name and Telegram ID are stored.

## Setup & Usage
1. Create a Google Sheet with the above structure.
2. Deploy a Google Apps Script or connect to a Telegram bot API to automate message sending.
3. Ensure proper authorization for the bot to send messages to the specified groups.

## Contributions
Contributions are welcome! Feel free to submit issues or pull requests to improve the system.

## License
This project is open-source and available under the [MIT License](LICENSE).

