const router = require("express").Router();
const { Projects, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const forumData = await Projects.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const forums = forumData.map((forum) => forum.get({ plain: true }));

    res.render("homepage", {
      forums,
      logged_in: req.sesion.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
