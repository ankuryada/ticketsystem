const express = require("express");
var app = express();
const { register,ticketregister,ticketget,ticketdelete,closeTicket } = require("../controller/usercontroller");
const router = express.Router();
const verifyToken = require("../middleware/auth");


router.post("/register",  register);
router.post("/ticket/new",verifyToken, ticketregister);
router.get("/ticket/get",verifyToken, ticketget);

router.post("/tickets/markAsClosed",verifyToken, closeTicket);

router.delete("/ticket/delete",verifyToken, ticketdelete);

module.exports = router;