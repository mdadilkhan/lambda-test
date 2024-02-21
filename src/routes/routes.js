const {addUser, getUser, login,image,addUserProfile, bulkUpload} = require('../controller/user')

exports.routes = {
    [`/addUser`]:{
        POST: addUser,
    },
    [`/getUser`]:{
        GET: getUser,
    },
    [`/login`]:{
        GET: login,
    },
    ['/image-url']:{
        GET:image
    },
    ['/addUserProfile']:{
        POST:addUserProfile
    },
    ['/bulkUpload']:{
        POST:bulkUpload
    }

}