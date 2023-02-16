const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');

const DB = require('./db');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello(name: String): String
  }
`);

const fileSchema = loadSchemaSync('schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});

// The root provides a resolver function for each API endpoint
var root = {
  async employees() {
    return await DB.getAllEmployees();
  },
  async employee({ name }) {
    return await DB.getEmployeeByName(name);
  },
  async reportsTo({ manager }) {
    return await DB.getEmployeesReportsTo(manager);
  },
  async createEmployee({ firstName, lastName }) {
    return await DB.createEmployee(firstName, lastName);
  },
  async deleteEmployee({ firstName }) {
    return await DB.deleteEmployee(firstName);
  },
};

var app = express();
app.use(
  '/',
  graphqlHTTP({
    schema: fileSchema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/');
