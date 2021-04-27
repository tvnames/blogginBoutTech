const router = require("express").Router;
const { User, Project } = require("../models");

router.get("/", async (req, res) => {
  try {
    const getAllProjects = await Project.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });
    res.render("homepage, getAllProjects");
    res.status(200).json(getAllProjects);
  } catch (err) {
    res.status(500).json(err);
  }
});
