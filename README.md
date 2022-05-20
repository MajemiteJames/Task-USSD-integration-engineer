##Programming assignment

Write a small program (in any language) that will read a file named
“messages.csv” row by row and send an HTTP API request based on data read
from the file.

Each row represents one SMS message and consists of four columns, two can be
populated manually (in a text editor) and two must be filled by the program.

The first two columns manually filled in are SenderId and MSISDN. You can fill the
MSISDN column with your phone number.

Details on how to fill in the SenderId column
will be explained later in this document.
Once a row is read and SenderId and MSISDN are extracted, you should generate a
random number and use it as the messageID in the HTTP request but also store it in
the appropriate row in the file. An HTTP API request should be sent to the Infobip SMS
API for each row.

Details on this endpoint can be found on the page:
https://www.infobip.com/docs/api/#channels/sms/send-sms-message
After the request is sent, the response will contain two important fields: messageId and
description. Match the messageId to the one stored in the file and write in the
description received for each message.
Example of a successful file (you can separate the values by any delimiter):
SenderId MSISDN messageId description
InfoSMS 385XXXXXXXXX 123456 Message sent to
next instance
InfoSMS 385YYYYYYYYY 456789
Message sent to

next instance
To solve this task, you will need to perform the following:
• Register for a new free account on https://portal.infobip.com
• Login into https://portal.infobip.com and navigate to “MY ACCOUNT” section
under Settings (click on your profile icon first, bottom left)
• Use the value under DEFAULT SENDER as SenderId in your task
• Use the API key (MY ACCOUNT> Manage API Keys) for authorization on the
SMS Send API
Send the resulting code and the file used for review.
