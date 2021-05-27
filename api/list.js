import fs from "fs";
import path from "path";

const lists = [];
[1, 2, 3].forEach((i) => {
  const raw = fs.readFileSync(
    path.resolve(__dirname, `../apiData/list_${i}.json`),
    "utf-8"
  );
  lists.push(JSON.parse(raw));
});

export default (req, res) => {
  const page = req.query.page;
  res.json({
    page,
    length: 3,
    data: lists[page - 1] || [],
  });
};
