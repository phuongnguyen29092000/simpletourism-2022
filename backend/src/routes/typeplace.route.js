const express = require("express");

const { typePlaceController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth("admin", "owner"), typePlaceController.getAllTypePlace);

router.get(
  "/:id",
  auth("admin", "owner"),
  typePlaceController.getTypePlaceById
);

router.post("/create", typePlaceController.createTypePlace);

router.put("/:id", auth("admin"), typePlaceController.updateTypePlacesById);

router.delete("/:id", auth("admin"), typePlaceController.deleteTypePlaceById);

module.exports = router;
