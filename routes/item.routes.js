const { Router } = require("express");
const router = Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth.middleware");
const Collection = require("../models/Collection");

router.post("/add", auth, async (req, res) => {
  try {
    const { name, tags, collection, username } = req.body;
    const item = new Item({
      owner: req.user.userId,
      ownerName: username,
      name,
      tags,
      collections: collection._id,
      collectionsName: collection.name,
    });
    await item.save();
    res.status(201).json({ item });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again", e });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find({
      owner: req.user.userId,
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

// router.get("/:id", auth, async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     res.json(item);
//   } catch (e) {
//     res.status(500).json({ message: "Something went wrong, please try again" });
//   }
// });

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndUpdate(id, {
      $set: { name: req.body.name, tags: req.body.tags },
    });
    res.json({ message: `Selected items was successfully updated` });
  } catch (e) {
    res.status(500).json({ message: resMessages.basicError });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    await Item.findByIdAndDelete(id);
    res.json({ message: `Selected items was successfully deleted` });
  } catch (e) {
    res.status(500).json({ message: resMessages.basicError });
  }
});

module.exports = router;
