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

const sendMessages = (message) =>
  Promise.allSettled(subs.map((s) => webpush.sendNotification(s, message)));

const saveSubscription = (subscription) => {
  if (!subs.find((s) => s.endpoint === subscription.endpoint)) {
    subs.push(subscription);
  }
};

export default async (req, res) => {
  const title = req.body.title;
  if (title) {
    await sendMessages(req.body);
    console.log(subs);
    res.json({ success: true });
    return;
  }
  const subscription = req.body;
  saveSubscription(subscription);
  res.json({ success: true });
};
