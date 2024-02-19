
const { headers }=require('../constant/header.js')
export const apiResponseBody = (statusCode, message,data) => {
    return {
        statusCode,
        headers,
        body: JSON.stringify({message,data:data})
    }
}