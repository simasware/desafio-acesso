import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgresql://postgres:docker@localhost:5432/desafio-acesso",
  {
    dialect: "postgres",
    logging: sqlLogger,
    define: {
      timestamps: false,
    },
  }
);

function sqlLogger(queryString, queryObject) {
  console.log(queryString);
  console.log(queryObject.bind);
}

export default sequelize;
