const router = require("express").Router();

const userRouter = require("./users");

const clothingItem = require("./clothingItems");

const { createUser, login } = require("../controllers/users.js");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.post("/signup", createUser);
router.post("/signin", login);

module.exports = router;
