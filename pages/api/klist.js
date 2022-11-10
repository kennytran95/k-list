// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("./database/mysqldatabase").dbConnection;

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === "GET") {
      db.query(
        "SELECT JSON_OBJECT( 'listid', l.id, 'listName', l.listName, 'listItems', (SELECT JSON_ARRAYAGG(JSON_OBJECT('listItemId', id ,'itemName', listItemName, 'location', location, 'notes', notes, 'type', type, 'image', image)) FROM listItem AS LI WHERE LI.listId = l.id)) AS ListEntry FROM list AS l",
        (err, result) => {
          if (err) {
            res.status(500).send(err);
            resolve();
          } else {
            res.status(200).send(result);
            resolve();
          }
        }
      );
    } else if (req.method === "POST") {
      db.query(
        `INSERT INTO list (listName) VALUES ('${req.body.listName}')`,
        (err, result) => {
          if (err) {
            res.status(500).send(err);
            resolve();
          } else {
            res.status(200).send("Sucessfully added to database");
            resolve();
          }
        }
      );
    }
  });
}
