import { Sequelize } from "sequelize";
import db from "../database/db.js";

const TransactionLog = db.define(
  "transaction_log",
  {
    transactionId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    accountOrigin: {
      type: Sequelize.STRING,
    },
    accountDestination: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    transactionType: {
      type: Sequelize.STRING,
      defaultValue: "Credit",
    },
    transactionStatus: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "In Queue",
    },
    transactionMessage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  { underscored: true }
);

export default TransactionLog;
