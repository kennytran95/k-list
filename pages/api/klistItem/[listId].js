// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../database/mysqldatabase").dbConnection;

export default function handler(req, res) {
  if (req.method === "PUT") {
    db.query(
      `UPDATE listItem SET notes = '${req.body.notes}' WHERE id = ${req.query.listId}`,
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send("Successfully edited entry");
        }
      }
    );
  } else if (req.method === "DELETE") {
    //needed to fix values
    db.query(
      `DELETE FROM listItem WHERE id = (${req.query.listId})`,
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
