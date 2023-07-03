/**
 * Title: logger.js
 * Author: Walter McCue
 * Date: 06/29/23
 * Description: Logging functions
*/

// Require statements
const { appendFileSync } =require('fs');
const { join } = require('path');

// Directory for logging
const debugLog = join(__dirname, 'debug.log')
const errorLog = join(__dirname, 'error.log')

// Function to collect date/time
const getDateTime = () => {
  const now = new Date()
  return now.toLocaleString('en-US')
}

// Successful operations are logged to the debug.log
module.exports.debugLogger = (data) => {
  const logString = `[${getDateTime()}] - ${data.apiCall} - ${data.message} - \n${data.item}\n\n`
  appendFileSync(debugLog, logString)
  console.log(`\n ${data.message}`)
  console.log(data.item)
}

// Errors are logged to the error.log
module.exports.errorLogger = (data) => {
  const logString = `[${getDateTime()}] - ${data.apiCall} - ${data.message} - \n${data.item}\n\n`
  appendFileSync(errorLog, logString)
  console.error(`\n ${data.message}`)
  console.error(data.item)
}
