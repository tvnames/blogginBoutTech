const User = require("./User");
const Projects = require("./projects");
const Comments = require("./comments");

User.hasMany(Projects, {
  foreignKey: "user_id",
});

Projects.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(Projects, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

User.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Projects.hasMany(Comments, {
  foreignKey: "project_id",
  onDelete: "cascade",
});

module.exports = { User, Projects, Comments };
