const sequelize = require("../config/connection");
const { User, Projects } = require("../models");

const userData = require("./userData.json");
const projectData = require("./projectData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const projects of projectData) {
    await Projects.create({
      ...projects,
      name: projects.name,
      content: projects.content,
      user_id: projects.user_id,
    });
  }

  process.exit(0);
};

seedDatabase();
