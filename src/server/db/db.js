const dotenv = require('dotenv');

dotenv.config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:jjf11ltf8@localhost:5432/BugOut', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
