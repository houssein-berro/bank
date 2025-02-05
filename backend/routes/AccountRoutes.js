const express = require("express");
const router = express.Router();
const {
  createAccount,
  createLoanAccount,
  getAccounts,
  getUserAccounts,
  deleteAccount,
  updateAccount,
  getAccountById
} = require("../controllers/accountController");

router.get("/", getAccounts);
router.get("/:id",getUserAccounts);

router.get("/singleAccount/:accountId",getAccountById);

router.post("/loan/:user", createLoanAccount);
router.post("/account/:id", createAccount);



router.delete("/:id", deleteAccount);

router.patch("/:id", updateAccount);

module.exports = router;
