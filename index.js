const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { resolvers } = require('./resolvers');
const { fileSchema } = require('./schema');

var app = express();

app.use(
  '/',
  graphqlHTTP({
    schema: fileSchema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/');
