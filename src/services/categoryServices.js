const { prisma } = require("../database.js");
require("dotenv").config();
const createError = require("http-errors");

const CategoryServices = {
  async CreateCatagory(data) {
    try {
      const UserExist = await prisma.category.create({
        data: data,
      });
      return {
        data: null,
        status: true,
        message: "Category Create Successfully",
      };
    } catch (error) {
      return createError(401, error);
    }
  },
};

module.exports = CategoryServices;
