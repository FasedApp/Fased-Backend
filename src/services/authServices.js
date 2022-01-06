const { prisma } = require("../database.js");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { signAccessToken } = require("../utils/jwt.js");
const SendMail = require("./emailServices.js");
const { createResponse, createError } = require("../utils/HelperFuntions.js");

const AuthServices = {

  async createUser(data) {
    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (user) return createError(401, "Email Already exist");
    data.password = bcrypt.hashSync(data.password, 8);
    const token = await crypto.randomBytes(3);

    // data.token = token
    try {
      const responseData = await prisma.user.create({
        data: data,
      });
      const tokenData = await prisma.token.create({
        data: {
          token: token.toString("hex"),
          userId: responseData.id,
        },
      });
      SendMail(responseData.email, token.toString("hex"));
      return createResponse(responseData, true, "User Created Successfully");
    } catch (error) {
      return createError(401, error);
    }
  },

  async verifyOtp(data) {
    const userExist = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!userExist) return createError("404", "User Not Found!");

    const verifyOtp = await prisma.token.findFirst({
      where: {
        userId: userExist.id,
      },
    });
    if (!verifyOtp || data.token != verifyOtp.token)
      return createError("401", "Otp is not set or expired");
    var diff = Math.abs(new Date(verifyOtp.createdAt) - new Date());
    var minutes = Math.floor(diff / 1000 / 60);
    if (minutes >= 2) return createError("401", "Otp is expired");
    const userData = await prisma.user.update({
      where: { id: userExist.id },
      data: { isVerified: true },
    });
    return createResponse(userData, true, "Account is now verified");
  },

  async resendOtp(data) {
    const userExist = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!userExist) return createError("404", "User Not Found!");
    const token = await crypto.randomBytes(6);
    const response = await prisma.token.update({
      where: {
        userId: userExist.id,
      },
      data: {
        token: token.toString("hex"),
        createdAt: new Date(),
      },
    });

    return createResponse(userExist, true, "otp is resend to your email");
  },

  async loginUser(data) {
    const userExist = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!userExist) return createError("404", "User Not Found!");

    const checkPassword = bcrypt.compareSync(data.password, userExist.password);
    if (!checkPassword) return createError("401", "Email/Password incorrect");
    // if (!userExist.isVerified)
    //   return createError("401", "Please Verify your account");

    userExist.password = "******";
    return createResponse(userExist, true, "Signin Successful");
  },

  async changePassword(data) {
    const userExist = await prisma.user.findFirst({
      where: { id: data.id },
    });

    if (!userExist) return createError("404", "User Not Found!");

    const checkPassword = bcrypt.compareSync(
      data.currentPassword,
      userExist.password
    );
    if (!checkPassword)
      return createError("401", "Current Password is incorrect");
    const newPassword = bcrypt.hashSync(data.newPassword, 8);

    try {
      const responseData = await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          password: newPassword,
        },
      });
      return createResponse(responseData, true, "Password Change Successfully");
    } catch (error) {
      return createError(401, error);
    }
  },

  async deleteUser(data) {
    const userExist = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!userExist) return createError("404", "User Not Found!");

    try {
      const responseData = await prisma.user.delete({
        where: {
          id: data.id,
        },
      });

      const users = await prisma.user.findMany();
      return createResponse(users, true, "User Delete Successfully");
    } catch (error) {
      return createError(401, error);
    }
  },

  async updateUser(data) {
    const userExist = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!userExist) return createError("404", "User Not Found");

    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    updatedUser.password = "*******";
    return createResponse(updatedUser, true, "User Update Successfully");
  },

  async forgotPassword(data) {
    const forgotpassword = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!forgotpassword) return createError("404", "User not registered with this email");
    const token = await crypto.randomBytes(3);
    // console.log("forgotpassword.id", forgotpassword.id)
    const tokenData = await prisma.token.upsert({
      where: {
        userId: forgotpassword.id,
      },
      update: {
        token: token.toString("hex"),
        createdAt: new Date(),
      },
      create: {
        token: token.toString("hex"),
        userId: forgotpassword.id,
      },
    });
    SendMail(data.email, token.toString("hex"));
    return createResponse(data, true, "Otp Send to your Email");
  },

  async OtpVerify_Email(data) {
    const userExist = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!userExist) return createError("404", "User Not Found!");
    const verifyOtp = await prisma.token.findFirst({
      where: {
        userId: userExist.id,
      },
    });
    if (!verifyOtp || data.token != verifyOtp.token)
      return createError("401", "Otp is not set or expired");
    var diff = Math.abs(new Date(verifyOtp.createdAt) - new Date());
    var minutes = Math.floor(diff / 1000 / 60);
    if (minutes >= 2) return createError("401", "Otp is expired");
 
    return createResponse(data, true, "Otp Verified Successfully");
  },

  async newPassword(data) {
    const userExist = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!userExist) return createError("404", "User Not Found!");

    const newPassword = bcrypt.hashSync(data.password, 8);

    try {
      const responseData = await prisma.user.update({
        where: {
          id: userExist.id,
        },
        data: {
          password: newPassword,
        },
      });
      return createResponse(data, true, "Password Changed Successfully");
    } catch (error) {
      return createError(401, error);
    }
  },

  async socialMediaLogin (data) {
    try {
      const isExist = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: data.email
            },
            {
              providerId: data.providerId
            }
          ]
        }
      })
      var response;
      if (isExist) {
         response = await prisma.user.update({
           where:{
            id: isExist.id
           },
          data: data
        })
      }else {
         response = await prisma.user.create({
          data: data
        })
      }
      
      return createResponse(response, true, "login successfully")
    } catch (error) {
      return createError(500, error, false)
    }
  }
};

module.exports = AuthServices;
