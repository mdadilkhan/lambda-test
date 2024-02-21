const aws=require('aws-sdk')
const dotenv=require('dotenv')
const crypto=require('crypto')
const { promisify } = require('util')

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWSREGION;
const bucketName = process.env.AWSBUCKETNAME;
const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETACCESSKEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
})

exports.generateSignedUrl = async (fileType) => {
    console.log("inisde generate url");
    const bytes = await randomBytes(16);
    const imageName = bytes.toString('hex');
    console.log("imagename>>",imageName);
    
    let contentType;
    switch (fileType) {
        case 'png':
            contentType = 'image/png';
            break;
        case 'jpg':
        case 'jpeg':
            contentType = 'image/jpeg';
            break;
        case 'pdf':
            contentType = 'application/pdf';
            break;
        case 'video':
            contentType = 'video/*'; // Adjust as needed for specific video types
            break;
        default:
            throw new Error('Unsupported file type');
    }
    const params = ({
        Bucket: bucketName,
        Key: imageName,
        ContentType: contentType, 
    })

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);
    return {
        signedUrl,
        imageName
    };
}

