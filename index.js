const {connectDB} =require('./src/utility/mongoDBClient.js')
const {apiResponseBody} =require('./src/utility/apiResponseBody.js')
const {routes}=require('./src/routes/routes.js')
const multipart = require('aws-lambda-multipart-parser');

exports.handler = async (event, context) => {
    console.log(event);
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDB();
    if(event.httpMethod === 'OPTIONS'){
        return apiResponseBody(200, 'success')
    }
    
    event.body = parseRequestBody(event);
    const {httpMethod , path} = event;
    const route = routes[path];
    console.log("route",route)

    if(!route?.[httpMethod]){
        return apiResponseBody(404, 'Not found');
    }

    const processHandler = route[httpMethod];
    return await processHandler(event);
}


// const parseRequestBody = (event) => {
//     // Check if the body is already parsed or not
//     if (typeof event.body === 'object') {
//         return event.body;
//     }

//     try {
//         // Parse the JSON body if it's a string
//         return JSON.parse(event.body || '{}');
//     } catch (error) {
//         // If parsing fails, return an empty object
//         console.error('Error parsing request body:', error);
//         return {};
//     }
// }



const parseRequestBody = (event) => {
    // Check if the body is already parsed or not
    if (typeof event.body === 'object') {
        console.log("inside the object");
        return event.body;
    }

    // Parse multipart form-data
    if (event.headers['content-type'] && event.headers['content-type'].startsWith('multipart/form-data')) {
        console.log("inside file parse");
        return multipart.parse(event.body).fields; // Return only the fields parsed from multipart form-data
    }

    try {
        console.log("inside try");
        // Parse the JSON body if it's a string
        return JSON.parse(event.body || '{}');
    } catch (error) {
        console.log("inside catch");

        // If parsing fails or body is empty, return an empty object
        console.error('Error parsing request body:', error);
        return {};
    }
}