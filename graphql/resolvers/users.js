const bcrypt = require("bcryptjs"); //used for hashing or encrypting passwords
const jwt = require("jsonwebtoken");
const { UserInputError, AuthenticationError } = require("apollo-server"); //apollo's way of return errors I THINK
const { args } = require("commander");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const Application = require("../../models/Application");
const { getIntrospectionQuery } = require("graphql");
const checkAuth = require("../../util/check-auth");
const Auto = require("../../models/Auto");

//resolver for user accounts

//generates a JSON web token for each user to login/register with
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getRandomUser() {
      try {
        let totalDocs = 5;
        let randomIndex = Math.floor(Math.random() * totalDocs);
        const user = await User.find().skip(randomIndex).limit(1);

        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async searchUser(_, { username }) {
      try {
        const user = await User.findOne({ username: username });
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUsers() {
      try {
        const users = await User.find().sort({ username: 1 });
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    async loadUsers(_, { limit, offset }) {
      try {
        const users = await User.find({})
          .sort({ createdAt: -1 })
          .skip(parseInt(offset))
          .limit(parseInt(limit));
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async editProfile(_, { bio, email, pfp, brandLink, username }, context) {
      const user = checkAuth(context);
      if (user) {
        let newUser;
        if (username) {
          newUser = await User.findByIdAndUpdate(
            user.id,
            { username: username },
            { new: true }
          );
        }
        if (bio) {
          newUser = await User.findByIdAndUpdate(
            user.id,
            { bio: bio },
            { new: true }
          );
        }
        if (email) {
          newUser = await User.findByIdAndUpdate(
            user.id,
            { email: email },
            { new: true }
          );
        }
        if (pfp) {
          newUser = await User.findByIdAndUpdate(
            user.id,
            { pfp: pfp },
            { new: true }
          );
        }
        if (brandLink) {
          newUser = await User.findByIdAndUpdate(
            user.id,
            { brandLink: brandLink },
            { new: true }
          );
        }
        return newUser;
      } else {
        throw new Error("Action not allowed");
      }
    },
    async login(_, { username, password }) {
      //checks for input-side errors like empty inputs
      const { errors, valid } = validateLoginInput(username, password);
      //if there are input-side errors, present them
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      //check for database-side errors like wrong password
      //wrong username
      const user = await User.findOne({ username });
      if (!user) {
        const user2 = await Application.findOne({username})
        if(user2){
          errors.general = "Brand is awaiting approval"
          throw new UserInputError("Brand is awaiting approval", { errors });
        }else{
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }

      }
      //wrong password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      //generate json web token that hides info of user
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      {
        registerInput: {
          username,
          password,
          email,
          pfp,
          bio,
          brandLink,
          confirmPassword,
        },
      }
    ) {
      //Validate user data
      //this will call our validator register function which will check for input-side errors like incorrect email adresses
      //or too long usernames. It will then return valid for true or false, and also any errors
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        brandLink,
        bio,
        pfp,
        email,
        confirmPassword
      );

      //TODO: Need to update external validators

      //make sure user with that username doesnt already exist
      const user1 = await User.findOne({ username });
      const user2 = await Application.findOne({ username });

      if (user1 || user2) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      //if there are any input-side errors then return them
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      //hashes password 12 times to encrypt
      password = await bcrypt.hash(password, 12);

      //then makes a new user (referring to the User model) with these variables
      const newUser = new Application({
        username,
        password,
        email,
        pfp,
        bio,
        brandLink,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      //generates a json web token for it that hides info of new user
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
