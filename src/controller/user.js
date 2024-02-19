const {getCollectionRef}=require('../utility/mongoDBClient.js')
const {apiResponseBody}=require('../utility/apiResponseBody.js')

export const addUser = async (event) => {
    const collection = await getCollectionRef('user');
    await collection.insertOne({user:1})
    return apiResponseBody(200,"sucess")
} 


export const getUser = async () => {
    const collection = await getCollectionRef('user');
    collection.findOne({user:1})
    return apiResponseBody(200,"success")
} 