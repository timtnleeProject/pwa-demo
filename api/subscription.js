import webpush from "web-push";

const vapidKeys = {
  publicKey:
    "BBLWcX2o9qUk1S5cS_58QK-B7hjw6yf-rrLrqRpi_z9S0OgaoUD9Y2bZI9ZThMfcu6YBSXkNVPKH2Mx2QThnUzQ",
  privateKey: process.env.vapidPrivate,
};

webpush.setVapidDetails(
  "mailto:web-push-book@gauntface.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushMessageLater = (subscription) => {
  setTimeout(() => {
    webpush.sendNotification(subscription, "Message from server!");
  }, 10000);
};

export default (req, res) => {
  const subscription = req.body;
  pushMessageLater(subscription);
  res.json(subscription);
};
