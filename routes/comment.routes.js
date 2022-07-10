const { Router } = require("express");
const router = Router();
const Comment = require("../models/Comment");
const auth = require("../middleware/auth.middleware");

router.get("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params
    const comments = await Comment.find({ item: itemId });
    res.json(comments);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = await new Comment({ ...req.body })
    await comment.save()
    res.status(201).json({ comment });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.json({ message: `Selected items was successfully deleted` });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndUpdate(id, req.body);
    res.json({ message: `Selected items was successfully updated` });
  } catch (e) {
    res.status(500).json({ message: resMessages.basicError });
  }
});

module.exports = router;
