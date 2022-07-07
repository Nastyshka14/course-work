const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult, body } = require("express-validator");
const User = require("../models/User");
const config = require("config");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("username", "Please enter username"),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Minimum password length 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      // console.log(req.body)
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect regisration data",
        });
      }
      const { username, email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "Such user already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ username, email, password: hashedPassword });

      await user.save();
      res.status(201).json({ message: "User created" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Enter a valid email").normalizeEmail().isEmail(),
    check("password", "Enter password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login details",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User is not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password, try again" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id, username: user.username, userRole: user.role });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);

module.exports = router;
