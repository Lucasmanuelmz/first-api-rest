const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("Products", "root", "4026.Test@Lucas#Manuel", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+02:00",
});

async function authenticationDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Autenticado com sucesso no banco de dados");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = sequelize;
