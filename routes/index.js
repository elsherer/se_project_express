const router = require("express").Router();

const userRouter = require("./users");

const clothingItem = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItem);

module.exports = router;
