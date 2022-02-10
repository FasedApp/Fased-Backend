const { prisma } = require("../database.js");
require("dotenv").config();
const { createResponse, createError } = require("../utils/HelperFuntions.js");
const Notification = require("./NotificationServices.js");

const NewsServices = {
  async CreateNews(data) {
    try {
      const News = await prisma.news.create({
        data: data,
      });
      const users = await prisma.user.findMany({
        where: {
          fcmToken: { not: "" },
        },
        select: {
          fcmToken: true,
        },
      });
      const tokens = users.map((val) => val?.fcmToken);
      await Notification.SendNotificationToMutliUsers(
        tokens,
        { screen: "NewsDetails", data: News },
        News.Title,
        News.Tagline
      );
      return {
        data: data,
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
      return createResponse(news, true, "report deleted successfully");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addToFavorite(data) {
    const userExist = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    const newsExist = await prisma.news.findUnique({
      where: {
        id: data.newsId,
      },
    });
    if (!userExist) return createError(404, "User not exist");
    if (!newsExist) return createError(404, "News not exist");

    try {
      const response = await prisma.favorites.findFirst({
        where: {
          userId: data.userId,
          newsId: data.newsId,
        },
      });

      if (response) {
        await prisma.favorites.delete({
          where: {
            id: response.id,
          },
        });
      } else {
        await prisma.favorites.create({
          data: data,
        });
      }

      let favorites = prisma.favorites.findMany({
        where: {
          userId: data.userId,
        },
        include: {
          News: true,
        },
      });
      return createResponse(
        favorites,
        true,
        response
          ? "Remove to favorite successfully"
          : "Add to favorite successfully"
      );
      // return createResponse(favorites, true, "Opration successfully")
    } catch (error) {}
  },

  async getFavoriteByUserId(data) {
    const userExist = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!userExist) return createError(404, "User not exist");
    const favorites = await prisma.favorites.findMany({
      where: {
        userId: data.userId,
      },
      include: {
        News: true,
      },
    });
    return { status: true, message: "", data: favorites };
  },

  async searchNews(data) {
    const favorites = await prisma.news.findMany({
      where: {
        OR: [
          {
            Title: {
              contains: data.text,
              mode: "insensitive",
            },
          },
          {
            Tagline: {
              contains: data.text,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        CategoryId: "asc",
      },
    });
    return { status: true, message: "", data: favorites };
  },

  async searchFav(data) {
    const userExist = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!userExist) return createError(404, "User not exist");
    const favorites = await prisma.favorites.findMany({
      where: {
        userId: data.userId,
        News: {
          OR: [
            {
              Title: {
                contains: data.text,
                mode: "insensitive",
              },
            },
            {
              Tagline: {
                contains: data.text,
                mode: "insensitive",
              },
            },
          ],
        },
      },
      include: {
        News: true,
      },
    });
    return { status: true, message: "", data: favorites };
  },
};

module.exports = NewsServices;
