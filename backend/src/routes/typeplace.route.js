const express = require("express");

const { typePlaceController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", typePlaceController.getAllTypePlace);

router.get(
  "/:id",
  typePlaceController.getTypePlaceById
);

router.post("/create", auth('admin'), typePlaceController.createTypePlace);

router.put("/:id", auth('admin'), typePlaceController.updateTypePlacesById);

router.delete("/:id", auth('admin'), typePlaceController.deleteTypePlaceById);

module.exports = router;
