const { Query } = require("./query.js");
const { Mutation } = require("./mutation.js");
const { GraphQLDate } = require('graphql-iso-date')
const BigInt =  require('../schema/typeBigInt')

const resolvers = {
    Query,
    Mutation,
    Date: GraphQLDate,
    BigInt: BigInt
  };
  
  module.exports = {
    resolvers,
  };