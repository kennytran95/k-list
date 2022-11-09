// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require("../database/mysqldatabase").dbConnection;
const yelpconfig = require("../../yelpconfig");
const axios = require("axios");

export default function handler(req, res) {
  if (req.method === "GET") {
    let businessName = req.query.business[0];
    let location = req.query.business[1];
    axios
      .get(
        `https://api.yelp.com/v3/businesses/search?term=${businessName}&location=${location}&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${yelpconfig.yelp_api_key}`,
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
  }
}
