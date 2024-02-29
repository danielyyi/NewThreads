const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

//imports our posts and users resolvers into one file so the main index.js file can easily access them
module.exports = {
    Post:{
        commentCount: (parent) => parent.comments.length
    },
    Query:{
        ...postsResolvers.Query,
        ...usersResolvers.Query,
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
}