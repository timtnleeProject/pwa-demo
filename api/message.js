import webpush from "web-push";
import db from "../store";

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

const getAllsubs = new Promise((resolve, reject) => {
  db.find({}, function (err, docs) {
    if (err) reject(err);
    else resolve(docs);
  });
});

const sendMessages = (message) =>
  getAllsubs().then((subs) =>
    Promise.allSettled(subs.map((s) => webpush.sendNotification(s, message)))
  );

export default async (req, res) => {
  const message = req.body.message;
  await sendMessages(message);
  res.json({ success: true });
};
