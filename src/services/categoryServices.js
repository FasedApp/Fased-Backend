const { prisma } = require("../database.js");
require("dotenv").config();
const createError = require("http-errors");

const CategoryServices = {
  async CreateReport(data) {
    try {
      const UserExist = await prisma.report.create({
        data: data,
      });
      return UserExist;
    } catch (error) {
      return createError(401, error);
    }
  },
};

module.exports = CategoryServices;
