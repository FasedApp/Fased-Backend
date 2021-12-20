
const { prisma } = require("../database.js");
const AuthServices = require("../services/authServices.js");
const NewsServices = require("../services/NewsServices.js");
const { createResponse } = require("../utils/HelperFuntions.js");


const Query = {
    // AUTH QUERIES
    loginUser : async (args, req, context) => {
        console.log("args, req, context", args, req, context)
        const response = await AuthServices.loginUser(req)
        return response
    },
    getAllUsers: async (args, req, context) => {
        const response = await prisma.user.findMany()
        return createResponse(response, true, "all users")
    },

    // REPORT QUERIES
    getReports: async (args, req) => {
        const response = await prisma.report.findMany()
        return createResponse(response, true, "all reports")
    },


    // CATEGORY QUERIES
    getCategories: async (args, req) => {
        const response = await prisma.category.findMany()
        return createResponse(response, true, "all categories")
    },


    // NEW QUERIES
    getNews: async (args, req) => {
        const response = await prisma.news.findMany()
        return createResponse(response, true, "all news")
    },
    getFavoriteByUserId: async (args, req) => {
        const response = await NewsServices.getFavoriteByUserId(req);
        return response;
    },
    
}

module.exports = {
    Query,
  }
