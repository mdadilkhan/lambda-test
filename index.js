const {connectDB} =require('./src/utility/mongoDBClient.js')
const {apiResponseBody} =require('./src/utility/apiResponseBody.js')
const {routes}=require('./src/routes/routes.js')

exports.handler = async (event, context) => {
    console.log(event);
    context.callbackWaitsForEmptyEventLoop = false;
    await connectDB();
    if(event.httpMethod === 'OPTIONS'){
        return apiResponseBody(200, 'success')
    }

    const {httpMethod , path} = event;
    const route = routes[path];
    console.log("route",route)

    if(!route?.[httpMethod]){
        return apiResponseBody(404, 'Not found');
    }

    const processHandler = route[httpMethod];
    return await processHandler(event);
}