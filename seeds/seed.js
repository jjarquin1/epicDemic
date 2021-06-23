//// just template will need to refactor as needed


const sequelize = require('./config/connection');
const { User } = require('./models');

const classData = require('./classData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(classData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
