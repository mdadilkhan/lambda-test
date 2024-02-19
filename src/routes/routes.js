const {addUser, getUser} = require('../controller/user')

exports.routes = {
    [`/addUser`]:{
        POST: addUser,
    
    },
    [`/getUser`]:{
        GET: getUser,
    },
}