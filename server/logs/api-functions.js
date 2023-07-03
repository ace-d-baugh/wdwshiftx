/**
 * Title: api-functions.js
 * Author: Walter McCue
 * Date: 06/29/23
 * Description: Functions for api calls
*/

const { debugLogger, errorLogger } = require("./logger");
const ServerResponse = require("./server-response");

// Success Response
function success(apiCall, responseData) {
  debugLogger({
    apiCall: apiCall,
    message: "Successful Query",
    item: responseData
  });
  const response = new ServerResponse(
    200,
    "Query Successful",
    responseData
  );
  return response
}

// Null Response
function nullError(apiCall, responseData) {
  errorLogger({
    apiCall: apiCall,
    message: "Object or Path not found",
    item: responseData
  });
  const response = new ServerResponse(
    404,
    "Object or Path not found",
    responseData
  );
  return response
}

// Server Error Response
function serverError(apiCall, responseData) {
  errorLogger({
    apiCall: apiCall,
    message: "Server Error",
    item: responseData
  });
  const response = new ServerResponse(
    500,
    "Server Error",
    responseData
  );
  return response
}

// Validation Error Response
function validationError(apiCall, responseData) {
  errorLogger({
    apiCall: apiCall,
    message: "Unable to validate data",
    item: responseData
  });
  const response = new ServerResponse(
    400,
    "Unable to validate data",
    responseData
  );
  return response
}

module.exports = { success, nullError, serverError, validationError };
