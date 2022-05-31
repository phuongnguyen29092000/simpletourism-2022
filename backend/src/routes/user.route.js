const express = require("express");

const { userController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", userController.getUserByRole);
router.get("/admin/owner-list", userController.getAllOwner);
router.get("/admin/customer-list", userController.getAllCustomer);

router.post("/create", userController.createUser);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUserById);
router.put("/become-owner/:customerId", userController.becomeOwner);

router.delete("/:id", userController.deleteUserById);

module.exports = router;
