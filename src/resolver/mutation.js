const { prisma } = require("../database.js");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const AuthServices = require("../services/authServices.js");
const ReportServices = require("../services/reportServices.js");
const CategoryServices = require("../services/categoryServices.js");
const NewsServices = require("../services/NewsServices.js");
const { createError } = require("../utils/HelperFuntions.js");
const FlagServices = require("../services/FlagServices.js");
const SubCategoryServices = require("../services/SubCategoryServices.js");

const Mutation = {
  // AUTH MUTATIONS
  addUser: async (args, req) => {
    const response = await AuthServices.createUser(req);
    return response;
  },
  socialMediaLogin: async (args, req) => {
    const response = await AuthServices.socialMediaLogin(req);
    return response;
  },
  changePassword: async (args, req) => {
    const response = await AuthServices.changePassword(req);
    return response;
  },
  deleteUser: async (args, req) => {
    const response = await AuthServices.deleteUser(req);
    return response;
  },
  // verifyOtp: async (args, req) => {
  //   const response = await AuthServices.verifyOtp(req)
  //   return response
  // },
  resendOtp: async (args, req) => {
    const response = await AuthServices.resendOtp(req);
    return response;
  },
  updateUser: async (args, req) => {
    const response = await AuthServices.updateUser(req);
    return response;
  },
  forgotPassword: async (args, req) => {
    const response = await AuthServices.forgotPassword(req);
    return response;
  },
  OtpVerify_Email: async (args, req) => {
    const response = await AuthServices.OtpVerify_Email(req);
    return response;
  },
  NewPassword: async (args, req) => {
    const response = await AuthServices.newPassword(req);
    return response;
  },

  // REPORT MUTATIONS
  CreateReport: async (args, req) => {
    const response = await ReportServices.CreateReport(req);
    return response;
  },
  EditReport: async (args, req) => {
    const response = await ReportServices.EditReport(req);
    return response;
  },
  deleteReport: async (args, req) => {
    const response = await ReportServices.deleteReport(req);
    return response;
  },

  // CATEGORY MUTATIONS
  CreateCatagory: async (args, req) => {
    const response = await CategoryServices.CreateCatagory(req);
    return response;
  },
  EditCategory: async (args, req) => {
    const response = await CategoryServices.EditCategory(req);
    return response;
  },
  deleteCategory: async (args, req) => {
    const response = await CategoryServices.deleteCategory(req);
    return response;
  },

  // SUBCATEGORY MUTATIONS
  CreateSubCategory: async (args, req) => {
    const response = await SubCategoryServices.CreateCatagory(req);
    return response;
  },
  EditSubCategory: async (args, req) => {
    const response = await SubCategoryServices.EditCategory(req);
    return response;
  },
  deleteSubCategory: async (args, req) => {
    const response = await SubCategoryServices.deleteCategory(req);
    return response;
  },

  // News MUTATIONS
  CreateNews: async (args, req) => {
    const response = await NewsServices.CreateNews(req);
    return response;
  },
  EditNews: async (args, req) => {
    const response = await NewsServices.EditNews(req);
    return response;
  },
  deleteNews: async (args, req) => {
    const response = await NewsServices.deleteNews(req);
    return response;
  },
  addToFavorite: async (args, req) => {
    const response = await NewsServices.addToFavorite(req);
    return response;
  },

  // FLAG MUTATIONS
  CreateReason: async (args, req) => {
    const response = await FlagServices.CreateReason(req);
    return response;
  },
  EditReason: async (args, req) => {
    const response = await FlagServices.EditReason(req);
    return response;
  },
  deleteReason: async (args, req) => {
    const response = await FlagServices.deleteReason(req);
    return response;
  },
  CreateFlagReport: async (args, req) => {
    const response = await FlagServices.CreateFlagReport(req);
    return response;
  },
  deleteFlagReport: async (args, req) => {
    const response = await FlagServices.deleteFlagReport(req);
    return response;
  },
};

module.exports = {
  Mutation,
};
