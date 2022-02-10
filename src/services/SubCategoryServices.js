const { prisma } = require("../database.js");
const { createError, createResponse } = require("../utils/HelperFuntions.js");
require("dotenv").config();

const SubCategoryServices = {
  async CreateCatagory(data) {
     const categoryExist = await prisma.category.findUnique({
      where: { id: data.CategoryId },
    });

    if (!categoryExist) return createError("404", "Category Not Found!");
    try {
      const UserExist = await prisma.subCategory.create({
        data: data,
      });
      return {
        data: null,
        status: true,
        message: "SubCategory Create Successfully",
      };
    } catch (error) {
      return createError(401, error);
    }
  },

  async EditCategory(data) {
    if(data.CategoryId) {
      const categoryExist = await prisma.category.findUnique({
        where: { id: data.CategoryId },
      });
  
      if (!categoryExist) return createError("404", "Category Not Found!");
    }

    const subCategoryExist = await prisma.subCategory.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!subCategoryExist) return createError("404", "SubCategory Not Found");

    const updateCategory = await prisma.subCategory.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return createResponse(updateCategory, true, "SubCategory Update Successfully");
  },

  async deleteCategory(data) {
    const categoryExist = await prisma.subCategory.findUnique({
      where: { id: data.id },
    });

    if (!categoryExist) return createError("404", "SubCategory Not Found!");

    try {
      const responseData = await prisma.subCategory.delete({
        where: {
          id: data.id,
        },
      });

      const categories = await prisma.subCategory.findMany();
      return createResponse(categories, true, "SubCategory delete Successfully");
    } catch (error) {
      return createError(401, error);
    }
  },


};

module.exports = SubCategoryServices;
