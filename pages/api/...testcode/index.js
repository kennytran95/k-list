const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const db = require("./database/mysqldatabase.js").dbConnection;

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist")));
app.use(morgan("dev"));
app.use(express.json());

app.get("/glist", (req, res) => {
  db.query(
    "SELECT JSON_OBJECT( 'listid', l.id, 'listName', l.listName, 'listItems', (SELECT JSON_ARRAYAGG(JSON_OBJECT('listItemId', id ,'itemName', listItemName, 'location', location, 'notes', notes, 'type', type, 'image', image)) FROM listItem AS LI WHERE LI.listId = l.id)) AS ListEntry FROM list AS l",
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.post("/glist", (req, res) => {
  db.query(
    `INSERT INTO list (listName) VALUES ('${req.body.listName}')`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("successfully added to database");
      }
    }
  );
});

app.post("/glistItem", (req, res) => {
  db.query(
    `INSERT INTO listItem (listItemName, location, notes, type, image, listId) VALUES ('${req.body.name}', '${req.body.location}', '${req.body.notes}', '${req.body.type}', '${req.body.image}', ${req.body.listId})`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("successfully added to database");
      }
    }
  );
});

app.put("/glist/:listId", (req, res) => {
  db.query(
    `UPDATE list SET listName = '${req.body.newListName}' WHERE id = ${req.params.listId}`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("successfully edited entry");
      }
    }
  );
});

app.put("/glistItem/:listId", (req, res) => {
  db.query(
    `UPDATE listItem SET notes = '${req.body.notes}' WHERE id = ${req.params.listId}`,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("successfully edited entry");
      }
    }
  );
});

app.delete("/glist/:id", (req, res) => {
  db.query(`DELETE FROM list WHERE id = (${req.params.id})`, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("deleted");
    }
  });
});

app.delete("/glistItem/:listItemId", (req, res) => {
  db.query(
    `DELETE FROM listItem WHERE id = (${req.params.listItemId})`,
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("deleted");
      }
    }
  );
});

app.get("/yelp/:business/:location", (req, res) => {
  axios
    .get(
      `https://api.yelp.com/v3/businesses/search?term=${req.params.business}&location=${req.params.location}&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${process.env.yelp_api_key}`,
        },
      }
    )
    .then((result) => {
      let results = [];
      result.data.businesses.forEach((business) => {
        let name = business.name;
        let image = business.image_url;
        let location = business.location.city;
        let type = [];
        business.categories.forEach((foodType) => {
          type.push(foodType.title);
        });
        let businessData = {
          name,
          image,
          location,
          type,
        };
        results.push(businessData);
      });
      res.send(results);
    });
});

app.listen(PORT, () => {
  console.log(`G-List is up and running on port: ${PORT}`);
});
