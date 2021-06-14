import db from "../store";

const saveSubscription = (subscription) =>
  new Promise((resolve, reject) => {
    db.insert(subscription, function (err, newDoc) {
      if (err) {
        reject(err);
        return;
      }
      resolve(newDoc._id);
    });
  });

export default async (req, res) => {
  const subscription = req.body;
  await saveSubscription(subscription);
  res.json({ success: true });
};
