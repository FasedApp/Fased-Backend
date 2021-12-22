const { Query } = require("./query.js");
const { Mutation } = require("./mutation.js");
const { GraphQLDate } = require('graphql-iso-date')


const resolvers = {
    Query,
    Mutation,
    Date: GraphQLDate
  };
  
  module.exports = {
    resolvers,
  };