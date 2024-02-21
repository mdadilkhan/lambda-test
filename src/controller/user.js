const {getCollectionRef}=require('../utility/mongoDBClient.js')
const {apiResponseBody}=require('../utility/apiResponseBody.js')
const { generateSignedUrl }=require('../S3/s3.js')
const multipart = require('aws-lambda-multipart-parser');
const axios =require("axios")
const dotenv = require("dotenv")
dotenv.config()

exports.addUser = async (event) => {
    console.log("event>>>", event);
  
    const { email, name, password } = event.body;
  
    try {
      console.log("data>>", email, password, name);
  
      const collection = await getCollectionRef('user');
      if (!collection) {
        throw new Error('Collection is undefined or null.');
      }
  
      // Option 1: Use `insertedId`
      const insertResult = await collection.insertOne({ email, password, name });
      const { insertedId } = insertResult; // Extract insertedId
  
   
  
      console.log("insertedId>>", insertedId);

      
      const res=apiResponseBody(200, true, "success");
      console.log("response",res);
      return res;
    } catch (error) {
      console.error("inside error", error);
      return apiResponseBody(500, false, error.message || error);
    }
  };


exports.getUser = async (event) => {
    console.log(event);
    const collection = await getCollectionRef('user');
    const data= await collection.findOne({email: 'mdadilkhan@gmail.com'})
    if (!data) {
        return apiResponseBody(404, "User not found");
    }

    return apiResponseBody(200, "success", data);
} 


exports.login = async (event) => {

    const { email } = event.queryStringParameters;
    console.log("queryparams",email);
    if (!email) {
        return apiResponseBody(400, "Email ID is required");
    }

    const collection = await getCollectionRef('user');


    const user = await collection.findOne({ email });

    if (!user) {
        return apiResponseBody(404, "User not found");
    }

    return apiResponseBody(200, "Success", user);
}

exports.image = async (event)=>{
    console.log("inisde image controller>>");
    try {
        const url=await generateSignedUrl()
        console.log("iamge url>>",url);
        return apiResponseBody(200,"success",url)
    } catch (error) {
        apiResponseBody(500,"failure") 
    }
   
}


exports.addUserProfile = async (event) => {
    console.log("event",event);
    console.log("Inside image controller");
    try {
        // Generate signed URL for uploading the image
        const { signedUrl, imageName } = await generateSignedUrl('png'); // Example: Generating signed URL for PNG image
       
        console.log("Image URL:", signedUrl,imageName);

        // Construct the URL of the uploaded image
        const imageUrl = `https://${process.env.AWSBUCKETNAME}.s3.${process.env.AWSREGION}.amazonaws.com/${imageName}`;
        console.log("imageUrl>>",imageUrl);
        
        // Here you can save the `imageUrl` to your database or use it for further processing

        return apiResponseBody(200, "success", {imageUrl,imageName});
    } catch (error) {
        console.error("Error:", error);
        return apiResponseBody(500, "failure");
    }
};

exports.bulkUpload = async (event) => {
    try {
        // Parse the multipart form-data
        // const formData = multipart.parse(event);

        // // Access the file data
        // const fileData = formData.files[0];
        // console.log('File data:', fileData);

        // // Access other form fields if needed
        // const { fields } = formData;
        // console.log('Other form fields:', fields);

        // Handle the file data as needed
        // For example, you can save the file to S3, process it, etc.

        return apiResponseBody(200, 'Success',event);
    } catch (error) {
        console.error('Error handling file upload:', error);
        return apiResponseBody(400, 'Failure');
    }
};



