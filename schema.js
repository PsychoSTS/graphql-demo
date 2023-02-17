const { buildSchema } = require('graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello(name: String): String
  }
`);

const fileSchema = loadSchemaSync('schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});

module.exports = {
  schema,
  fileSchema,
};
