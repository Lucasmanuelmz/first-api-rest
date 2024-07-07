const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./model/userModel");
const jwt = require("jsonwebtoken");
const checkToken = require("./middlewares/auth");
const bcrypt = require("bcryptjs");

const Product = require("./database/models/product");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const jwtSecret =
  "yteerefesiahafsuddthwowwy3832p2y4t4jrhffweq1p]32426aqxt#5rr04u44=pfjfbf;gn";

app.post("/auth", (req, res) => {
  let { email, password } = req.body;

  User.findOne({
    where: { email: email, password: password },
  })
    .then((user) => {
      if (user != undefined) {
        let correct = bcrypt.compareSync(password, user.password);
        if (correct) {
          jwt.sign(
            { user },
            jwtSecret,
            { expiresIn: "48h" },
            (error, token) => {
              if (error) {
                res.status(500);
              } else {
                res.status(200).json({ token: token });
              }
            },
          );
        } else {
          res.status(404);
        }
      } else {
        res.status(404);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.get("/product", checkToken, (req, res) => {
  Product.findAll().then((products) => {
    if (products != undefined && products.length > 0) {
      res.status(200).json({ products: products });
    } else {
      res.sendStatus(404);
    }
  });
});

app.get("/product/:id", (req, res) => {
  let id = parseInt(req.params.id);

  if (!isNaN(id) && id != undefined) {
    Product.findOne({ where: { id: id } })
      .then((product) => {
        if (product != undefined) {
          res.status(200).json(product);
        }
      })
      .catch(() => {
        res.statusCode = 500;
      });
  }
});

app.post("/product", checkToken, (req, res) => {
  let { name, description, price, category } = req.body;
  let prices = parseFloat(price);

  if (name && description && !isNaN(prices) && category) {
    Product.create({
      name: name,
      description: description,
      price: prices,
      category: category,
    }).then(() => {
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(400);
  }
});

app.put("/product", checkToken, (req, res) => {
  let { id, name, description, price, category } = req.body;
  let prices = parseFloat(price);

  Product.update(
    {
      name: name,
      description: description,
      price: prices,
      category: category,
    },
    {
      where: { id: id },
    },
  )
    .then((products) => {
      res.sendStatus(200).json({ products: products });
    })
    .catch((error) => {
      res.sendStatus(404);
    });
});

app.delete("/product/:id", checkToken, (req, res) => {
  let id = parseInt(req.params.id);
  if (!isNaN(id)) {
    Product.destroy({ where: { id: id } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.sendStatus(404);
        console.log(error.message);
      });
  } else {
    res.statusCode(400);
  }
});

app.post("/user", (req, res) => {
  let { name, email, password } = req.body;

  User.findOne({
    where: { email: email },
  }).then((user) => {
    if (user == undefined) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);

      User.create({
        name: name,
        email: email,
        password: hash,
      })
        .then(() => {
          res.status(200);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(400);
    }
  });
});

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  }
});
