
const asyncHandler = require("express-async-handler");
const csv = require("csv-parser");
const fs = require("fs");
const infobip = require("node-infobip")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// @desc    Create new SMS
// @route   POST/api/sms
// @access  Public
const sms = asyncHandler((req, res) => {
    const results = [];
    fs.createReadStream('../messages.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async() => { 
      let phone_number = results.map(item => item.MSISDN)
    var arrayLength = phone_number.length;
    for (var i = 0; i < arrayLength; i++) {
      let single_phone_number = phone_number[i];
                    
           try {
                  console.log(await infobip.status())
                 let auth = new infobip.Auth('App', process.env.API_key)
                
                 let sms = new infobip.SMS(process.env.SenderID, 'https://api.infobip.com');
         
                 
                 sms.authorize(auth);
        
                let result = await sms.single(`+${single_phone_number}`, 'Hello there!');
                const csvWriter = createCsvWriter({
                  path: '../task/message.csv',
                  header: [
                    {id: 'SenderId', title: 'SenderId'},
                    {id: 'MSISDN', title: 'MSISDN'},
                    {id: 'messageId', title: 'messageId'},
                    {id: 'description', title: 'description'}
                    ]
                   
              });
              const records = [
                {
                  SenderId:"ServiceSMS",
                  MSISDN:`${single_phone_number}`,
                  messageId:`${result.messages[0].messageId}`,
                 description:`${result.messages[0].status.description}`}
              ]
                //console.log(result.messages.status);
                csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
              csvWriter.writeRecords(records)
            });
              } catch (error) {
                   console.log(error)
                 res.status(404).json({
                     status: 404,
                    message: "sms not sent"
                 });
                 throw new Error(error);
              }
             
     }

    
  }, (error) => {
    console.log(error)
  });
  res.status(201).json({
                status: 201,
                message: "sms sent successfully"
                
            })
});


module.exports = sms;