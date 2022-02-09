const admin = require("firebase-admin");
const Notification = {
  async SendNotificationToMutliUsers(usertokens, data, title, description) {
    const message = {
      notification: { title: title, body: description },
      data: data,
      tokens: usertokens,
    };
    try {
      const result = await admin.messaging().sendMulticast(message);
      console.log("result SendNotificationToMutliUsers", result);
    } catch (error) {
      console.log("error  SendNotificationToMutliUsers", error);
    }
  },
};

module.exports = Notification;
