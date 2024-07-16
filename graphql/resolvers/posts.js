const { AuthenticationError } = require("apollo-server");
const { args } = require("commander");
const { off } = require("../models/Post");

const Post = require("../models/Post");
const checkAuth = require("../../graphql/util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 }).limit(3);
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async loadPosts(_, { limit, offset, category }) {
      let c = 0;
      switch (category) {
        case 0:
          c = "all";
          break;
        case 1:
          c = "tshirt";
          break;
        case 2:
          c = "sweatshirt";
          break;
        case 3:
          c = "shorts";
          break;
        case 4:
          c = "pants";
          break;
        case 5:
          c = "hat";
          break;
        case 6:
          c = "other";
          break;
      }

      if (c != "all") {
        try {
          const posts = await Post.find({ category: c })
            .sort({ createdAt: -1 })
            .skip(parseInt(offset))
            .limit(parseInt(limit));
          // const posts = await Post.find({category: category}).sort({createdAt:-1}).skip(parseInt(offset)).limit(parseInt(limit))
          return posts;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .skip(parseInt(offset))
            .limit(parseInt(limit));
          return posts;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    async loadBySex(_, { limit, sex }) {
      try {
        const posts = await Post.find({ sex: sex })
          .sort({ createdAt: -1 })
          .limit(parseInt(limit));
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async loadByCategory(_, { limit, category }) {
      try {
        const posts = await Post.find({ sex: category })
          .sort({ createdAt: -1 })
          .limit(parseInt(limit));
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPostsByUser(_, { userId, limit }) {
      try {
        const posts = await Post.find({ user: userId })
          .sort({ createdAt: -1 })
          .limit(parseInt(limit));
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async countPosts(_, { userId }) {
      try {
        const count = await Post.find({ user: userId }).countDocuments();
        if (count) {
          return count;
        } else {
          throw new Error("Count not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async priceFilter(_, {min, max}) {
      try {
        const posts = await Post.find( { price: { $gte: min, $lte:max } } )
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(
      _,
      { title, caption, image, price, productLink, sex, category },
      context
    ) {
      const user = checkAuth(context); //authenticate user

      if (caption.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const count = await Post.find({ user: user.id }).countDocuments();
      if (count >= 12) {
        throw new Error(
          "The maximum number of posts is 12 for each brand. Please remove one of your current posts to create another."
        );
      }

      const newPost = new Post({
        title,
        caption,
        productLink,
        image,
        price,
        sex,
        category,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        console.log(user.id);
        console.log(post.user);
        if (user.id == post.user || user.username == "Admin") {
          await post.deleteOne();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
