const { prisma } = require("../database.js");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createError = require('http-errors');
const AuthServices = require("../services/authServices.js");
const ReportServices = require("../services/reportServices.js");
const CategoryServices = require("../services/categoryServices.js");

const Mutation = {

    // AUTH SERVICES
    addUser: async (args, req) => { 
      const response = await AuthServices.createUser(req)     
      return response 
    },
    changePassword: async (args, req) => {
      const response = await AuthServices.changePassword(req)
      return response
    },
    deleteUser: async (args, req) => {
      const response = await AuthServices.deleteUser(req)
      return response
    },
    // verifyOtp: async (args, req) => {
    //   const response = await AuthServices.verifyOtp(req)
    //   return response
    // },
    resendOtp: async (args, req) => {
      const response = await AuthServices.resendOtp(req)
      return response
    },
    updateUser: async (args, req) => {
      const response = await AuthServices.updateUser(req)
      return response
    },
    forgotPassword: async (args, req) => {
      const response = await AuthServices.forgotPassword(req)
      return response
    },
    OtpVerify_Email: async (args, req) => {
      const response = await AuthServices.OtpVerify_Email(req)
      return response
    },
    NewPassword: async (args, req) => {
      const response = await AuthServices.newPassword(req)
      return response
    },



    // REPORT SERVICES
    CreateReport: async (args, req) => {
      const response = await ReportServices.CreateReport(req)
      return response
    },
    EditReport: async (args, req) => {
      const response = await ReportServices.EditReport(req)
      return response
    },
    deleteReport: async (args, req) => {
      const response = await ReportServices.deleteReport(req)
      return response
    }, 


    // CATEGORY SERVICES
    CreateCatagory: async (args, req) => {
      const response = await CategoryServices.CreateCatagory(req)
      return response
    },
    EditCategory: async (args, req) => {
      const response = await CategoryServices.EditCategory(req)
      return response
    },
    deleteCategory: async (args, req) => {
      const response = await CategoryServices.deleteCategory(req)
      return response
    },
  };

  module.exports = {
    Mutation,
  }

