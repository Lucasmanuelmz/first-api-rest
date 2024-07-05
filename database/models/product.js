const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('product', 
    {
        name: {
          type: DataTypes.STRING,
          allowNull: null,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


    module.exports = Product;