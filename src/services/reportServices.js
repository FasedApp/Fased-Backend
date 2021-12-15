const { prisma } = require("../database.js");
require("dotenv").config();
const createError = require("http-errors");

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
};

module.exports = ReportServices;
