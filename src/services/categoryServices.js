const { prisma } = require("../database.js");
const { createError, createResponse } = require("../utils/HelperFuntions.js");
require("dotenv").config();

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

  async EditCategory(data) {
    const categoryExist = await prisma.category.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!categoryExist) return createError("404", "Category Not Found");

    const updateCategory = await prisma.category.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return createResponse(updateCategory, true, "Category Update Successfully");
  },

  async deleteCategory(data) {
    const categoryExist = await prisma.category.findUnique({
      where: { id: data.id },
    });

    if (!categoryExist) return createError("404", "Report Not Found!");

    try {
      const responseData = await prisma.category.delete({
        where: {
          id: data.id,
        },
      });

      const categories = await prisma.category.findMany();
      return createResponse(categories, true, "Category delete succesfull");
    } catch (error) {
      return createError(401, error);
    }
  }
};

module.exports = CategoryServices;
