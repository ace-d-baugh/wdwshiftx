/**
 * Title: server-response.js
 * Author: Walter McCue
 * Date: 06/29/23
 * Description: Server response and logging functions
*/

const getDateTime = () => {
  const now = new Date()
  return now.toLocaleString('en-US')
}

// Allows us to store server responses
class ServerResponse {
  constructor (httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      timestamp: getDateTime()
    }
  }
}

module.exports = ServerResponse;
