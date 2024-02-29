const {AuthenticationError} = require('apollo-server');
const { args } = require('commander');
const { off } = require('../../models/Post');


const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getPosts() {
          try {
            const posts = await Post.find({}).sort({createdAt:-1}).limit(3);
            return posts;
          } catch (error) {
            throw new Error(error);
          }
        },
        async loadPosts(_, {limit}) {
          try {
            const posts = await Post.find({}).sort({createdAt:-1}).limit(parseInt(limit))



            return posts;
          } catch (error) {
            throw new Error(error);
          }
        },
        async getPostsByUser(_, {username, limit}) {
          try {
            const posts = await Post.find({username: username}).sort({createdAt:-1}).limit(parseInt(limit));
            return posts;
          } catch (error) {
            throw new Error(error);
          }
        },
        async getPost(_, {postId}){
          try{
            const post = await Post.findById(postId);
            if(post){
              return post;
            }else{
              throw new Error('Post not found')
            }
          }catch(err){
            throw new Error( err)
          }
        }
      },
      Mutation: {
        
        async createPost(_, { caption, image, color}, context){
          const user = checkAuth(context) //authenticate user

          if(caption.trim() === ''){
            throw new Error('Post body must not be empty')
          }

          const newPost = new Post({ 
            caption,
            image,
            color,
            user: user.id,
            username: user.username,
            createdAt: new Date().toISOString()
          })

          const post = await newPost.save();

          return post;
        },
        async deletePost(_, {postId}, context){
          const user = checkAuth(context)

          try{
            const post = await Post.findById(postId)
            if(user.username === post.username || user.username == "Admin"){
              await post.delete() 
              return 'Post deleted successfully'
            }else{
              throw new AuthenticationError('Action not allowed')
            }
          }catch(error){
            throw new Error(error)
          }
        }
      }
}