const express = require('express');
const app = express();

const Product = require('./database/models/product');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/product', (req, res) => {
    Product.findAll().then(products => {
        if(products != undefined) {
            res.sendStatus(200)
            res.json({
                products
            })
        }else{
            res.sendStatus(400)
        }
    })
    
});

app.post('/product', (req, res) => {
    let {name, description, price, category} = req.body;
    let prices = parseFloat(price)

    if(name && description && !isNaN(prices) && category) {
         Product.create(
       {
        name: name,
        description: description,
        price: prices,
        category: category
       }).then(() => {
        res.sendStatus(200)
    })
    } else {
        res.sendStatus(400)
    }
});

app.get('/product/:id', (req, res) => {
    let id = req.params.id;
    if(id != undefined) {
        Product.findByPk(id).then(product => {
            if(product != undefined) {
                res.sendStatus(200)
            }else{
                res.sendStatus(404)
            }
        }).catch((error) => {
          res.sendStatus(500)
        })
    }else{
        res.sendStatus(404)
    }
})

app.put('/product', (req, res) => {

    let {id, name, description, price, category} = req.body;
    let prices = parseFloat(price)
    
Product.update(
{
    name: name,
    description: description,
    price: prices,
    category: category, 
},
{
    where: {id: id}
}
).then(products => {
        res.sendStatus(200)
        res.json({products})
    }).catch((error)=> {
        res.sendStatus(404)
    })
})

app.delete('/product',(req, res) => {
    let {id} = req.body;
    Product.destroy({where: {id:id}}).then(() => {
        res.sendStatus(200)
    }).catch(error => {
        res.sendStatus(404)
        console.log(error.message)
    })
})

app.listen(3000, error => {
    if(error) {
        console.log(error)
    }
})