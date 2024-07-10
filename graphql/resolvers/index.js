const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const autoResolvers = require('./auto')
//imports our posts and users resolvers into one file so the main index.js file can easily access them
module.exports = {
    Post:{
        //pretty sure theres comment resolvers here that I deleted
    },
    Query:{
        ...postsResolvers.Query,
        ...usersResolvers.Query,
        ...autoResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...autoResolvers.Mutation,
    },
}