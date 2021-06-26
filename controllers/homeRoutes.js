const router = require("express").Router();
const { Account, Entry } = require("../models");
const withAuth = require("../utils/auth");

// This is home route, If the user is already logged in, redirect to user's profile page
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  // res.render("dashboard", {
  //   layout: "main",
  //   // logged_in: true,
  // });
});

router.get("/home", (req, res) => {
  let logged_in = false;
  if (req.session.logged_in) {
    logged_in = true;
  }
  res.render("home", {
    layout: "main",
    logged_in,
  });
});

router.get("/about", (req, res) => {
  let logged_in = false;
  if (req.session.logged_in) {
    logged_in = true;
  }
  res.render("team", {
    layout: "main-about",
    logged_in,
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("home", {
    layout: "main",
  });
});

//route to profile

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const accountData = await Account.findByPk(req.session.account_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Entry,
        },
      ],
      // join other table data here later
    });

    const userEntriesData = accountData.get({ plain: true }).entries;
    account = accountData.get({ plain: true });
    console.log(userEntriesData);

    res.render("dashboard", {
      layout: "main",
      account,
      userEntriesData,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
