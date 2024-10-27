// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment,sendPayementEmail, verifyPayment } = require("../controllers/Payements")
const { auth, isInstructor, isStudent, isAdmin } = require("../middelwares/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth,isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail",auth,isStudent, sendPayementEmail)

module.exports = router 