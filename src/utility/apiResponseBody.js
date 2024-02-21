
const { headers }=require('../constant/header.js')
exports.apiResponseBody = (statusCode, message,data) => {
    return {
        statusCode,
        headers,
        body: {message,data:data}
    }
}