const router = require("express").Router();
const { Projects, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

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
router.get("/projects/:id", async (req, res) => {
  try {
    const oneForum = await Projects.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
        },
      ],
    });
    const oneSetup = oneForum.get({ plain: true });
    oneSetup.comments.forEach(async (comments) => {
      const user = await User.findByPk(comments.user_id);
      comments.user_name = user.name;
    });
    res.render("post", { oneSetup, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password", "email"] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    console.log(user);
    res.render("dashboard", { user, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
