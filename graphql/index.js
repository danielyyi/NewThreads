const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers/index.js');
const { MONGODB } = require('./config.js');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect('mongodb+srv://yidan23:Bote61did@cluster0.f34jv.mongodb.net/Clothes?retryWrites=true&w=majority', {  })
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
