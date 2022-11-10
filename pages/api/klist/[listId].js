// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../database/mysqldatabase").dbConnection;

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "PUT") {
      db.query(
        `UPDATE list SET listName = '${req.body.newListName}' WHERE id = ${req.query.listId}`,
        (err, result) => {
          if (err) {
            res.status(500).send(err);
            resolve();
          } else {
            res.status(200).send("Successfully edited entry");
            resolve();
          }
        }
      );
    } else if (req.method === "DELETE") {
      db.query(
        `DELETE FROM list WHERE id = (${req.query.listId})`, //fixed listId name
        (err, result) => {
          if (err) {
            res.status(500).send(err);
            resolve();
          } else {
            res.status(200).send("Successfully deleted entry");
            resolve();
          }
        }
      );
    }
  });
}
