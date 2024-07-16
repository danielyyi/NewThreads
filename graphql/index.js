let dotenv = require('dotenv').config() //leave this out
const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers/index.js');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(process.env.MONGODB, {  })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
  .catch(err=>{
    console.error(err)
  })
