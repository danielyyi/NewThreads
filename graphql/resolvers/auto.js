const { AuthenticationError } = require("apollo-server");
const { args } = require("commander");
const { off } = require("../models/Post");

const Auto = require("../models/Auto");
const Post = require("../models/Post");
const checkAuth = require("../../graphql/util/check-auth");

module.exports = {
  Query: {
    async getAuto(_, { counter }) {
      try {
        const size = await Auto.countDocuments();
        const auto = await Auto.findOne({}).skip(counter%(size-1));
        if (auto) {
          const posts = await Post.find({
            _id: {
              $in: [auto.post1, auto.post2, auto.post3, auto.post4],
            },
          });

          if (posts) {
            return posts;
          } else {
            throw new Error("Posts not found");
          }
        } else {
          throw new Error("Auto not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getDailyPosts(_, { post1, post2, post3, post4 }) {
      try {
        const posts = await Post.find({
          _id: {
            $in: [post1, post2, post3, post4],
          },
        });
        if (posts) {
          return posts;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

  },
  Mutation: {
    async createAuto(_, { counter, post1, post2, post3, post4 }) {
      const newAuto = new Auto({
        counter,
        post1,
        post2,
        post3,
        post4
      });

      const auto = await newAuto.save();

      return auto;
    },
  },
};
