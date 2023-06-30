/**
 * Title: server-response.js
 * Author: Walter McCue
 * Date: 06/29/23
 * Description: Server response and logging functions
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
  const logString = `[${getDateTime()}] server\t ${data.filename} - ${data.message} - ${data.item}\n`
  appendFileSync(debugLog, logString)
  console.log(logString)
}

// Errors are logged to the error.log
module.exports.errorLogger = (data) => {
  const logString = `[${getDateTime()}] server\t ${data.filename} - ${data.message} - ${data.item}\n`
  appendFileSync(errorLog, logString)
  console.log(logString)
}

// Allows us to store server responses
class ServerResponse {
  constructor (httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
  toObject () {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      timestamp: getDateTime()
    }
  }
}

module.exports = ServerResponse;
