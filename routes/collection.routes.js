const { Router } = require("express");
const router = Router();
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const auth = require("../middleware/auth.middleware");

router.post("/create", auth, async (req, res) => {
  try {
    const { name, description, theme, image, username } = req.body;
    const collection = new Collection({
      owner: req.user.userId,
      ownerName: username,
      name,
      description,
      theme,
      image,
    });
    await collection.save();
    res.status(201).json({ collection });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again1", e });
  }
});

router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find({ owner: req.user.userId });
    res.json(collections);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.get("/top", async (req, res) => {
  try {
    const Collections = await Collection.find();
    const collectionIdsArr = await Collections.map((collection) => collection.id);

    const promises = collectionIdsArr.map(async (id) => {
      const count = await Item.countDocuments({ collections: id });
      return {id, count};
    });
    const result = await Promise.all(promises)
    const result2 = await result.sort((a, b) => a.count > b.count ? -1 : 1)
    const result3 = await result2.slice(0, 5)

      const result4 = await Collections.filter((collection) => {
        if (result3.some(({ id }) => id === collection._id.toString())) {
          return collection
        }

      })
      res.json(result4)


  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again", e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    res.json(collection);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    await Collection.findByIdAndDelete(id);
    const lol = await Item.deleteMany({collections: id})
    console.log('ID', lol)
    res.json({ message: `Selected items was successfully deleted` });
  } catch (e) {
    res.status(500).json({ message: resMessages.basicError });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Collection.findByIdAndUpdate(id, {
      $set: { name: req.body.name, description: req.body.description, theme: req.body.theme },
    });
    res.json({ message: `Selected collections was successfully updated` });
  } catch (e) {
    res.status(500).json({ message: resMessages.basicError });
  }
});

module.exports = router;
