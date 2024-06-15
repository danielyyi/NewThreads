const { gql } = require("apollo-server");

//type definitions (one for each 'type' and then include any use cases for each inside each type definition)
module.exports = gql`
  type User {
    id: ID!
    token: String!
    username: String!
    email: String!
    bio: String
    brandLink: String!
    createdAt: String!
    pfp: String!
  }
  type Post {
    id: ID!
    username: String!
    title: String!
    caption: String!
    price: String!
    image: String!
    productLink: String!
    brandLink: String!
    createdAt: String!
    sex: String!
    category: String!
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
    getRandomUser: [User]
    loadUsers(limit: Int!, offset: Int!): [User]
    getPostsByUser(username: String!, limit: Int!): [Post]
    getPost(postId: ID!): Post
    getUser(id: ID!): User
    getUserByName(username: String!): User
    searchUser(username: String!): User
    loadPosts(limit: Int!, offset: Int!): [Post]
    loadBySex(limit: Int!, sex: String!): [Post]
    loadByCategory(limit: Int!, category: String!): [Post]
  }
  input RegisterInput {
    username: String!
    password: String!
    pfp: String!
    confirmPassword: String!
    bio: String!
    brandLink: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(
      caption: String!
      image: String!
      price: String!
      title: String!
      productLink: String!
      sex: String!
      category: String!
    ): Post!
    deletePost(postId: ID!): String!
  }
`;
