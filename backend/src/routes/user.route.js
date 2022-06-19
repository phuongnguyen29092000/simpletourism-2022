const express = require("express");

const { userController } = require("../controllers");
const auth = require('../middlewares/auth')

const router = express.Router();

router.get("/", userController.getUserByRole);

router.get("/admin/owner-list", auth('admin'), userController.getAllOwner);

router.get("/admin/customer-list", auth('admin', 'owner'), userController.getAllCustomer);

router.get("/owner/:id/customers", auth("owner"), userController.getAllCustomerBookedTour)

router.post("/create", auth('admin'), userController.createUser);

router.get("/:id", auth('admin', 'owner', 'customer'),userController.getUserById);

router.put("/:id", auth('admin'), userController.updateUserById);

router.put("/set_active/:userId", auth('admin'), userController.setActiveUser);

router.put("/become-owner/:customerId", auth('admin'), userController.becomeOwner);

router.delete("/:id", auth('admin'), userController.deleteUserById);

module.exports = router;
