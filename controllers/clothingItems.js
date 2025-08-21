const ClothingItem = require("../models/clothingItem");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).json({ data: item }))
    .catch((err) => {
      console.log(err.name);
      console.log(err.name);

      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).json({ message: "Invalid data" });
      }

      res
        .status(SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).json({ data: items }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      res
        .status(SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        res
          .status(FORBIDDEN)
          .json({ message: "You cannot delete another user's item" });
      }

      ClothingItem.findByIdAndDelete(itemId).then((deletedItem) =>
        res.status(OK).send({ data: deletedItem })
      );
    })
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      if (err.name === "CastError") {
        res.status(BAD_REQUEST).json({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).json({ message: "Item not found" });
      }

      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => res.status(OK).json({ data: item }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      if (err.name === "CastError") {
        res.status(BAD_REQUEST).json({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      res
        .status(SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => res.status(OK).json({ data: item }))
    .catch((err) => {
      console.error(err);
      console.log(err.name);

      if (err.name === "CastError") {
        res.status(BAD_REQUEST).json({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      res
        .status(SERVER_ERROR)
        .json({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
