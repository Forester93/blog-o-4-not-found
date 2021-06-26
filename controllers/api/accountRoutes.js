const router = require("express").Router();
const { Account, Entry } = require("../../models");

// Route to Get All

router.post("/", async (req, res) => {
  try {
    const accountData = await Account.findOne({
      where: { username: req.body.username },
    });

    if (!accountData) {
      res.status(400).json({ message: "Login failed. Please try again" });
      return;
    }

    const validPassword = await accountData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Login failed. Please try again" });
      return;
    }

    req.session.save(() => {
      req.session.account_id = accountData.id;
      req.session.logged_in = true;
      // console.log(req.session.account_id);
      // console.log(req.session.logged_in);
      res.json({ message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/create", async (req, res) => {
  // create a new account
  try {
    const accountInfo = await Account.create(req.body);
    let account = accountInfo.get({ plain: true });
    console.log(account);

    req.session.save(() => {
      req.session.account_id = account.id;
      req.session.logged_in = true;
    });
    res.status(200).json("Account created!").redirect("../../profile");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
