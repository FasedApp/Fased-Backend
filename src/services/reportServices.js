const { prisma } = require("../database.js");
require("dotenv").config();
const { createResponse, createError } = require("../utils/HelperFuntions.js");

const ReportServices = {
  async CreateReport(data) {
    const UserExist = await prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!UserExist) return createError(401, "User Dosn't Exist");
    try {
      const responseData = await prisma.report.create({
        data: data,
      });
       return {
        data: null,
        status: true,
        message: "Incident Reported Successfully",
      };
    } catch (error) {
      return createError(401, error);
      
    }
  },

  async EditReport(data) {
    const reportExist = await prisma.report.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!reportExist) return createError("404", "Report Not Found");

    const updateReport = await prisma.report.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return createResponse(updateReport, true, "Report Update Successfully");
  },

  async deleteReport(data) {
    const reportExist = await prisma.report.findUnique({
      where: { id: data.id },
    });

    if (!reportExist) return createError("404", "Report Not Found!");

    try {
      const responseData = await prisma.report.delete({
        where: {
          id: data.id,
        },
      });

      const reports = await prisma.report.findMany();
      return createResponse(reports, true, "Report deleted");
    } catch (error) {
      return createError(401, error);
    }
  },

  async filterReports(data) {
    try {
      const filterCategories = await prisma.report.findMany({
        where: {
          OR: [
            {
              CategoryId: {
                in: data.showIds,
              },
            },
            {
              SubCategory: {
                in: data.showIds,
              },
            },
          ],
        },
      })

      return createResponse(filterCategories, true, "filter categories")
    } catch (error) {
      return createError(500, error)
    }
  }
};

module.exports = ReportServices;
