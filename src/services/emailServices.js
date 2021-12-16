
const SendMail = (toUser, otp) => {
    console.log("send mail running")
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        // host: "smtp.office365.com",
        service: "outlook",
        port: 2525,
        auth: {
            user: "mudassir.raza@techstirr.com",
            pass: "Mudassir@2021"
        }
    })

    // transporter.verify(function (error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("Server is ready to take our messages");
    //     }
    // });

    message = {
        from: "mudassir.raza@techstirr.com",
        to: toUser,
        subject: "Account Verification",
        text: `your registration OTP is ${otp} `
    }

    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log("error transporter", err)
        } else {
            console.log('transporter info', info);
        }
    })
}

module.exports = SendMail
