const router = require("express").Router();
const { Entry, Account } = require("../../models");

// The `/api/entries` endpoint
router.get("/", async (req, res) => {
  try {
    const entries = await Entry.findAll({
      include: [
        {
          model: Account,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    // entries = entries.get({ plain: true });
    res.status(200).send(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const entries = await Account.findByPk(req.params.id, {
      include: [
        {
          model: Entry,
        },
      ],
      attributes: { exclude: ["password"] },
    });

    entries = entries.get({ plain: true });

    if (!entries) {
      res.status(404).send("Record not found!");
      return;
    }

    res.status(200).send(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let entries = await Entry.findByPk(req.params.id, {
      include: [
        {
          model: Account,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    entries = entries.get({ plain: true });

    if (!entries) {
      res.status(404).send("Record not found!");
      return;
    }

    if (entries.account.id == req.session.account_id) {
      const deletedEntry = await Entry.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deletedEntry) {
        res.status(404).json({ message: "No entry found with this id!" });
        return;
      }
      res.status(200).json(deletedEntry);
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
