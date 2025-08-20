const router = require("express").Router();

const userRouter = require("./users");

const clothingItemsRouter = require("./clothingItems");

const { createUser, login } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

router.post("/signup", createUser);
router.post("/signin", login);

module.exports = router;
