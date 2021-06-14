import webpush from "web-push";

const subs = [];

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

const pushMessageLater = (subscription) => {
  if (!subs.find((s) => s === subscription)) {
    subs.push(subscription);
  }
  return Promise.allSettled(
    subs.map((s) => webpush.sendNotification(s, "Message from server!"))
  );
};

export default async (req, res) => {
  const subscription = req.body;
  await pushMessageLater(subscription);
  res.json(subs);
};
