const express = require("express");
const router = express.Router();

// Import all controllers using require
const {register,verifyUser,login,getUser,verifyOTP,createResetSession,resetPassword,updateUser,generateOTP,returnUsers,saveVideo,getAllVideos} = require('../controllers/appController.js');
const {registerMail} = require('../controllers/mailer.js');
const {localVariables,Auth} = require('../middleware/auth.js');


/** POST Methods */
router.route('/register').post(register); // register user
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(verifyUser,login); // login in app
router.route('/savevideo').post(Auth,saveVideo);
/** GET Methods */
router.route('/user/:username').get(getUser) // user with username
router.route('/generateOTP').get(verifyUser, localVariables, generateOTP) // generate random OTP
router.route('/verifyOTP').get(verifyUser, verifyOTP) // verify generated OTP
router.route('/createResetSession').get(createResetSession) // reset all the variables
router.route('/returnallusers').get(returnUsers)
router.route('/returnallvideos').get(Auth,getAllVideos)

/** PUT Methods */
router.route('/updateuser').put(Auth, updateUser); // is use to update the user profile
router.route('/resetPassword').put(verifyUser, resetPassword); // use to reset password



module.exports = router;






