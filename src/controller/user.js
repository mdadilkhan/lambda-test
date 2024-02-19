const {getCollectionRef}=require('../utility/mongoDBClient.js')
const {apiResponseBody}=require('../utility/apiResponseBody.js')

exports.addUser = async (event) => {
    const collection = await getCollectionRef('user');
    await collection.insertOne({user:1})
    return apiResponseBody(200,"success")
} 


exports.getUser = async () => {
    const collection = await getCollectionRef('user');
    collection.findOne({user:1})
    return apiResponseBody(200,"success")
} 