
const { headers }=require('../constant/header.js')
exports.apiResponseBody = (statusCode, message,data) => {
    return {
        statusCode,
        headers,
        body: JSON.stringify({message,data:data})
    }
}