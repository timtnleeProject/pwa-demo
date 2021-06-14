import webpush from "web-push";

const vapidKeys = {
  publicKey:
    "BBLWcX2o9qUk1S5cS_58QK-B7hjw6yf-rrLrqRpi_z9S0OgaoUD9Y2bZI9ZThMfcu6YBSXkNVPKH2Mx2QThnUzQ",
  privateKey: process.env.vapidPrivate,
};

webpush.setVapidDetails(
  "mailto:litingen1995@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushMessageLater = (subscription) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      webpush.sendNotification(subscription, "Message from server!");
      resolve();
    }, 10000);
  });

export default (req, res) => {
  const subscription = req.body;
  pushMessageLater(subscription);
  res.json(vapidKeys);
};
