const { AuthenticationError, UserInputError } = require("apollo-server");
const { args } = require("commander");
const { off } = require("../models/Post");

const Post = require("../models/Post");
const Tag = require("../models/Tag");
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
    async loadPosts(_, { limit, offset, category, sex, price, tags }) {
      var variables = {};
      var sorts = { createdAt: -1 };
      if (
        category != null &&
        category != "all" &&
        category != "" &&
        category !== "null" &&
        category != "NaN"
      ) {
        variables.category = category;
      }
      if (sex != null && sex != "" && sex != "all" && sex !== "null") {
        variables.sex = sex;
      }
      if (price != null && price != "" && price != "NaN" && price !== "null") {
        let min = Number(price.split("to")[0]);
        let max = Number(price.split("to")[1]);
        variables.price = { $gte: min, $lte: max };
        sorts = { price: 1 };
      }

      if (tags != null && tags != "" && tags != "NaN" && tags !== "null") {
        let tagsArray = tags.split("%2C");
        variables.tags = { $elemMatch: { name: { $in: tagsArray } } };
      }

      try {
        const posts = await Post.find(variables)
          .sort(sorts)
          .skip(parseInt(offset))
          .limit(parseInt(limit));

        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async filterTags(_, { tags }) {
      try {
        const posts = await Post.find({
          tags: { $elemMatch: { name: { $in: tags } } },
        });

        return posts;
      } catch (error) {
        throw new Error(error);
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
    async priceFilter(_, { min, max }) {
      try {
        const posts = await Post.find({ price: { $gte: min, $lte: max } });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getTags(_, {}) {
      try {
        const tags = await Tag.find({});
        return tags;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getTag(_, { name }) {
      try {
        const tag = await Tag.findOne({ name });
        return tag;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async addTag(_, { tag }) {
      try {
        const name = tag.name;
        const color = tag.color;
        const check = await Tag.findOne({ name: name });
        if (check) {
          return;
        }

        const newTag = new Tag({
          name,
          color,
        });

        const tg = await newTag.save();

        return tg;
      } catch (error) {
        throw new Error(error);
      }
    },
    async createPost(
      _,
      { title, caption, image, price, productLink, sex, category, tags },
      context
    ) {
      const user = checkAuth(context); //authenticate user
      const count = await Post.find({ user: user.id }).countDocuments();
      if (count >= 12) {
        throw new Error(
          "The maximum number of posts is 12 for each brand. Please remove one of your current posts to create another."
        );
      }
      const errors = {};

      if (title.trim() === "") {
        errors.title = "Title must not be empty";
      } 
      if (title.length > 21) {
        errors.title1 = "Title is too long";
      }
      if (caption.trim() === "") {
        errors.caption = "Description must not be empty";
      } 
      if (caption.length > 100) {
        errors.caption1 = "Description is too long";
      }
      if (image.trim() === "") {
        errors.image = "Posts must contain an Image";
      }
      if (price < 0 || price > 200) {
        errors.price = "Price must be between 0 and 200";
      }
      if (productLink.trim() === "") {
        errors.productLink = "Product Link must not be empty";
      }
      if (productLink.length > 600) {
        errors.productLink1 = "Product Link is too long";
      }

      if (Object.keys(errors) && Object.keys(errors).length > 0) {
        throw new UserInputError("Errors", { errors });
      }

      const newPost = new Post({
        title,
        caption,
        productLink,
        image,
        price,
        sex,
        category,
        tags,
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
