
const { prisma } = require("../database.js");
const AuthServices = require("../services/authServices.js");


const Query = {
    // AUTH QUERIES
    loginUser : async (args, req, context) => {
        console.log("args, req, context", args, req, context)
        const response = await AuthServices.loginUser(req)
        return response
    },
    getAllUsers: async (args, req, context) => {
        const response = await prisma.user.findMany()
        return response
    },

    // REPORT QUERIES
    getReports: async (args, req) => {
        const response = await prisma.report.findMany()
        return response
    },


    // CATEGORY QUERIES
    getCategories: async (args, req) => {
        const response = await prisma.category.findMany()
        return response
    }
    
}

module.exports = {
    Query,
  }
