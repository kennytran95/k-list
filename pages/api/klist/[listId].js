// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../database/mysqldatabase").dbConnection;

export default function handler(req, res) {
  if (req.method === "PUT") {
    db.query(
      `UPDATE list SET listName = '${req.body.newListName}' WHERE id = ${req.query.listId}`,
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send("Successfully edited entry");
        }
      }
    );
  } else if (req.method === "DELETE") {
    db.query(
      `DELETE FROM list WHERE id = (${req.query.listId})`, //fixed listId name
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send("Successfully deleted entry");
        }
      }
    );
  }
}
