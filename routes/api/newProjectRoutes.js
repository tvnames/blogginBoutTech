const router = require("express").Router();
const { Project } = require("../../models");

// CREATE a trip
router.post("/", async (req, res) => {
  try {
    const projectData = await Project.create(req.body);
    res.status(200).json(projectData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a trip
router.delete("/:id", async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: { id: req.params.id },
    });
    if (!projectData) {
      res.status(404).json({ message: "No project with this id!" });
      return;
    }
    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
