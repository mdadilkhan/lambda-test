const {MongoClient} = require('mongodb');
const env=require('dotenv')
env.config();
const mongoURL = process.env.DATABASE

const dbName = process.env.DB_NAME

let dbClient = null;
const collectionNameRef = {};

export const connectDB = async () => {
    const collectionsName = ['user', 'product']
    try{
        if(db){
            return;
        }

        const client = await MongoClient.connect(mongoURL, {minPoolSize: 10});
        dbClient = client.db(dbName);

        const collections = await db.listCollections().toArray();
        const existingCollectionsName = collections && collections.length > 0 && collections.map((eachCollection) => eachCollection.name) || []
        for(const collection of collectionsName){
              if(!existingCollectionsName.includes(collection)){
                await dbClient.createCollection(collection);
                await dbClient.collection(collection).createIndex({'userId': 1})
              }
              collectionNameRef[collection] = dbClient.collection(collection)
        }
    }
    catch(err){
        console.log(err);
    }
} 

export const getCollectionRef = (collectionName) => {
    return collectionNameRef[collectionName]
} 
