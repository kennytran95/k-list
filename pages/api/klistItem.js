// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("./database/mysqldatabase").dbConnection;

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "POST") {
      db.query(
        `INSERT INTO listItem (listItemName, location, notes, type, image, listId) VALUES ('${req.body.name}', '${req.body.location}', '${req.body.notes}', '${req.body.type}', '${req.body.image}', ${req.body.listId})`,
        (err, result) => {
          if (err) {
            res.status(500).send(err);
            resolve();
          } else {
            res.status(200).send("Successfully added to database");
            resolve();
          }
        }
      );
    }
  });
}
