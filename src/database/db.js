import { Sequelize } from "sequelize";
import doetenv from "dotenv";

doetenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: "postgres",
  logging: sqlLogger,
  define: {
    timestamps: true,
  },
});

function sqlLogger(queryString, queryObject) {
  console.log(queryString);
  console.log(queryObject.bind);
}

export default sequelize;
