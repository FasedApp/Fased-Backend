const SendMail = (toUser, otp) => {
  const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "development@appstirr.com", // Your email id
      pass: "D3v3l0p3r!@#", // Your password
    },
  });

  // transporter.verify(function (error, success) {
  //     if (error) {
  //         console.log(error);
  //     } else {
  //         console.log("Server is ready to take our messages");
  //     }
  // });

  message = {
    from: "development@appstirr.com",
    to: toUser,
    subject: "Account Verification",
    text: `your registration OTP is ${otp} `,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log("error transporter", err);
    } else {
    }
  });
};

module.exports = SendMail;
