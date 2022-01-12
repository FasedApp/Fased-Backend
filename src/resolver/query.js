const { prisma } = require("../database.js");
const AuthServices = require("../services/authServices.js");
const CategoryServices = require("../services/categoryServices.js");
const NewsServices = require("../services/NewsServices.js");
const ReportServices = require("../services/reportServices.js");
const { createResponse } = require("../utils/HelperFuntions.js");

const Query = {
  // AUTH QUERIES
  loginUser: async (args, req, context) => {
    const response = await AuthServices.loginUser(req);
    return response;
  },
  getAllUsers: async (args, req, context) => {
    const response = await prisma.user.findMany();
    return createResponse(response, true, "all users");
  },

  // REPORT QUERIES
  getReports: async (args, req) => {
    const response = await prisma.report.findMany({
      include: {
        Category: true,
      },
    });
    return createResponse(response, true, "all reports");
  },
  filterReports: async (args, req) => {
    const response = await ReportServices.filterReports(req);
    // console.log("response", response)
    return response;
  },
  filterReportsByDate: async (args, req) => {
    const response = await ReportServices.filterReportsByDate(req);
    // console.log("response", response)
    return response;
  },

  // CATEGORY QUERIES
  getCategories: async (args, req) => {
    const response = await prisma.category.findMany();
    return createResponse(response, true, "all categories");
  },

  // NEWS QUERIES
  getNews: async (args, req) => {
    const response = await prisma.news.findMany({
      orderBy: {
        CategoryId: "asc"
      }
    });
    return createResponse(response, true, "all news");
  },
  searchNews: async (args, req) => {
    const response = await NewsServices.searchNews(req);
    return response;
  },
  getFavoriteByUserId: async (args, req) => {
    const response = await NewsServices.getFavoriteByUserId(req);
    return response;
  },

  getFlagReports:async (args, req) => {
    const response = await prisma.flagReport.findMany({
      include: {
        User: true
      }
    })
    return createResponse(response, true, "all reports");;
  },

  getFlagReasons:async (args, req) => {
    const response = await prisma.flagReason.findMany()
    return createResponse(response, true, "all reasons");;
  },
};

module.exports = {
  Query,
};
