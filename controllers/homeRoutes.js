const router = require("express").Router();
const { Account, Entry, Comment } = require("../models");
const withAuth = require("../utils/auth");

// This is home route, If the user is already logged in, redirect to user's profile page
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  } else {
    res.redirect("/home");
  }
  // res.render("dashboard", {
  //   layout: "main",
  //   // logged_in: true,
  // });
});

router.get("/home", async (req, res) => {
  let logged_in = false;
  if (req.session.logged_in) {
    logged_in = true;
  }
  try {
    const entries = await Entry.findAll({
      include: [
        {
          model: Account,
          attributes: { exclude: ["password"] },
        },
        {
          model: Comment,
          include: [{ model: Account, attributes: { include: ["username"] } }],
        },
      ],
    });
    // const allUserEntries = UserEntries.get({ plain: true });
    const allUserEntries = entries.map((item) => {
      let comments = [];
      if (item.dataValues.comments) {
        comments = item.dataValues.comments.map((commentData) => {
          return {
            cid: commentData.cid,
            comment: commentData.comment,
            username: commentData.account.username,
            date: commentData.date,
          };
        });
      }
      // console.log(comments);
      return {
        id: item.dataValues.id,
        title: item.dataValues.title,
        content: item.dataValues.content,
        date: item.dataValues.date,
        account: {
          username: item.dataValues.account.username,
          id: item.dataValues.account.id,
        },
        comments,
      };
    });
    // console.log(allUserEntries);
    res.render("home", {
      layout: "main",
      allUserEntries,
      logged_in,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
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
    });
    let account = accountData.get({ plain: true });
    const accountEntries = await Entry.findAll({
      include: [
        {
          model: Account,
          attributes: { exclude: ["password"] },
          where: { id: req.session.account_id },
        },
      ],
      // join other table data here later
    });
    // console.log(accountEntries);
    if (!accountEntries) {
      res.render("dashboard", {
        layout: "main",
        account: account,
        logged_in: true,
      });
    } else {
      const userEntriesData = accountEntries.map((item) => {
        return {
          id: item.dataValues.id,
          title: item.dataValues.title,
          content: item.dataValues.content,
          date: item.dataValues.date,
          account,
        };
      });

      res.render("dashboard", {
        layout: "main",
        account,
        userEntriesData,
        logged_in: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
