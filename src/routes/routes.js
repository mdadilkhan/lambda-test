const {addUser, getUser} = require('../controller/user')

export const routes = {
    [`/${process.env.environment}/addUser`]:{
        POST: addUser,
    
    },
    [`/${process.env.environment}/getUser`]:{
        GET: getUser,
    },
}