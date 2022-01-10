const Sequelize = require("sequelize");
const doetenv = require("dotenv");

doetenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
  },
});

// function sqlLogger(queryString, queryObject) {
//   console.log(queryString);
//   console.log(queryObject.bind);
// }

module.exports = sequelize;
