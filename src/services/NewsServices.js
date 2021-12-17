const { prisma } = require("../database.js");
require("dotenv").config();
const createError = require("http-errors");
const { createResponse } = require("../utils/HelperFuntions.js");

const NewsServices = {
  async CreateNews(data) {
    try {
      const News = await prisma.news.create({
        data: data,
      });
      return {
        data: null,
        status: true,
        message: "News Create Successfully",
      };
    } catch (error) {
      return createError(401, error);
    }
  },

  async EditNews(data) {
    const newsExist = await prisma.news.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!newsExist) return createError("404", "News Not Found");

    const updateNews = await prisma.news.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return createResponse(updateNews, true, "News Update Successfully");
  },

  async deleteNews(data) {
    const newsExist = await prisma.news.findUnique({
      where: { id: data.id },
    });

    if (!newsExist) return createError("404", "News Not Found!");

    try {
      const responseData = await prisma.news.delete({
        where: {
          id: data.id,
        },
      });

      const news = await prisma.news.findMany();
      return news;
    } catch (error) {
      return createError(401, error);
    }
  }
};

module.exports = NewsServices;
