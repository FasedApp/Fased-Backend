const { prisma } = require("../database.js");
const { createError, createResponse } = require("../utils/HelperFuntions.js");
require("dotenv").config();

const FlagServices = {
  async CreateReason(data) {
    try {
      const reason = await prisma.flagReason.create({
        data: data,
      });
      return {
        data: null,
        status: true,
        message: "Reason Create Successfully",
      };
    } catch (error) {
      return createError(401, error);
    }
  },

  async EditReason(data) {
    const flagReasonExist = await prisma.flagReason.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!flagReasonExist) return createError("404", "Reason Not Found");

    const updateReason = await prisma.flagReason.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return createResponse(updateReason, true, "Reason Update Successfully");
  },

  async deleteReason(data) {
    const reasonExist = await prisma.flagReason.findUnique({
      where: { id: data.id },
    });

    if (!reasonExist) return createError("404", "Reason Not Found!");

    const reportExist = await prisma.flagReport.findFirst({
      where: {
        reasonId: reasonExist.id
      }
    })

    if (reportExist) return createError("403", "Flag report exists belong to this reason");

    try {
      const responseData = await prisma.flagReason.delete({
        where: {
          id: data.id,
        },
      });

      const reasons = await prisma.flagReason.findMany();
      return createResponse(reasons, true, "Reason delete succesfull");
    } catch (error) {
      return createError(401, error);
    }
  },

  async CreateFlagReport(data) {
    try {
      const Report = await prisma.flagReport.create({
        data: data,
        include: {
            User: true
        }
      });
      return {
        data: Report,
        status: true,
        message: "Reason Create Successfully",
      };
    } catch (error) {
      return createError(401, error);
    }
  },

  async deleteFlagReport(data) {
    const reportExist = await prisma.flagReport.findUnique({
      where: { id: data.id },
    });

    if (!reportExist) return createError("404", "Report Not Found!");

    // const reportExist = await prisma.flagReport.findFirst({
    //   where: {
    //     reasonId: reasonExist.id
    //   }
    // })

    // if (reportExist) return createError("403", "Flag report exists belong to this reason");

    try {
      const responseData = await prisma.flagReport.delete({
        where: {
          id: data.id,
        },
      });

      const reports = await prisma.flagReport.findMany();
      return createResponse(reports, true, "Report delete succesfull");
    } catch (error) {
      return createError(401, error);
    }
  },
};

module.exports = FlagServices;
