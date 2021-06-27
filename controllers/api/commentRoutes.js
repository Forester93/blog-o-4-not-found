const router = require("express").Router();
const { Account, Entry, Comment } = require("../../models");

// The `/api/comments` endpoint
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: Account,
          attributes: { exclude: ["password"] },
        },
        {
          model: Entry,
          include: [
            {
              model: Account,
              attributes: { exclude: ["password"] },
            },
          ],
        },
      ],
    });
    // entries = entries.get({ plain: true });
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//deleting a comment

router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Account,
          attributes: { exclude: ["password"] },
        },
        {
          model: Entry,
          attributes: { include: ["id"] },
          include: [
            {
              model: Account,
              attributes: { exclude: ["password"] },
            },
          ],
        },
      ],
    });
    const comment = commentData.get({ plain: true });
    // console.log(comment);
    // console.log(req.session.account_id);
    // Check that the user either own the comment or the blog post.
    if (
      req.session.account_id == comment.account_id ||
      req.session.account_id == comment.entry.account_id
    ) {
      const deletedComment = await Comment.destroy({
        where: { cid: req.params.id },
      });
      res.json(deletedComment);
    } else {
      res.status(403).send("Access Denied");
    }
    // entries = entries.get({ plain: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new comment

router.post("/new", async (req, res) => {
  try {
    if (!req.session.account_id) {
      res.status(403).json({ message: "Access Denied" });
      return;
    }
    req.body.account_id = req.session.account_id;
    let newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
