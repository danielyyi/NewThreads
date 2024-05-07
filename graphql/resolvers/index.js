const postsResolvers = require('./posts')
const usersResolvers = require('./users')

//imports our posts and users resolvers into one file so the main index.js file can easily access them
module.exports = {
    Post:{
        //pretty sure theres comment resolvers here that I deleted
    },
    Query:{
        ...postsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
    },
}