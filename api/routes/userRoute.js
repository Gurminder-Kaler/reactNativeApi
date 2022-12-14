const express = require("express");
const router = express.Router();
const userController = require("@controllers/userController");
const testController = require("@controllers/testController");
// const checkAuthMiddleware = require("@middlewares/checkAuth");
// const checkRoleMiddleware = require("@middlewares/checkRole");

//REST API- structure.

// GET retrieves resources.
// POST submits new data to the server.
// PUT updates existing data.
// DELETE removes data.

/**
 * @private GET users/:type
 * @params type
 * @usage Get either all doctors, all patients or all nurses by putting the type.
*/
router.get("/type/:type", userController.getAllUsersOfType);
//----------------------------------------------------------------------

/**
 * @private GET users/:userId/patients
 * @params userId
 * @usage Get all patients of a User.
*/
router.get("/:userId/patients", userController.getAllPatientsOfAUser);
//----------------------------------------------------------------------

/**
 * @private GET users/patients/:patientId
 * @params patientId
 * @usage Get patients info via patientId.
*/
router.get("/patients/:patientId", userController.getAPatientsInfo);
//----------------------------------------------------------------------

/**
 * @private GET users/:userId
 * @params userId
 * @usage Get details of a user, since patient is also a type of user.
*/
router.get("/:userId", userController.getUserViaId);
//----------------------------------------------------------------------

/**
 * @private POST users/patients
 * @usage Add/Register a patient
*/
router.post("/patients", userController.addPatient);
//----------------------------------------------------------------------

/**
 * @public POST users/signUp
   @usage Add/Register a user: Doctor or Nurse.
*/
router.post("/signUp", userController.signUp);
//----------------------------------------------------------------------

/**
 * @public POST users/signIn
 * @usage Login a doctor or a nurse.
*/

router.post("/signIn", userController.signIn);
//----------------------------------------------------------------------

/**
 * @public PUT users/updateProfile
 * @params userId
 * @usage Update a user's information.
*/
router.put("/:userId", userController.updateProfile);
//----------------------------------------------------------------------

/**
 * @public POST users/updateProfile
 * @params userId
 * @usage Update a user's information.
*/
router.post("/sendForgotPasswordOTPEmail", userController.sendForgotPasswordOTPEmail);
//----------------------------------------------------------------------

/**
 * @public POST users/updateProfile
 * @params userId
 * @usage Update a user's information.
*/
router.post("/verifyOTP", userController.verifyOTP);
//----------------------------------------------------------------------

/**
 * @public POST users/updateProfile
 * @params userId
 * @usage Update a user's information.
*/
router.post("/updatePassword", userController.updatePassword);
//----------------------------------------------------------------------

/**
 * @private GET users/patients/:patientId/tests/:testId
 * @params patientId
 * @params testId
 * @usage Get a the test of a patient.
*/
router.get("/patients/:patientId/tests/:testId", testController.getATestOfAPatient);
//----------------------------------------------------------------------

/**
 * @private GET users/patients/:patientId/tests
 * @params patientId
 * @usage Get all the tests of a patient.
*/
router.get("/patients/:patientId/tests", testController.getAllTestsOfAPatient);
//----------------------------------------------------------------------

/**
 * @private POST users/patients/:patientId/tests
 * @params patientId
 * @usage Add a test for a patient.
*/
router.post("/patients/:patientId/tests", testController.addATestOfAPatient);

module.exports = router;

