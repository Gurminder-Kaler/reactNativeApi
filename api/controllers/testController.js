const {
    getAllTestsOfAPatientServiceFunc,
    getATestOfAPatientServiceFunc,
    addATestOfAPatientServiceFunc
  } = require("@services/testService");
  

exports.getAllTestsOfAPatient = async (req, res) => {
  // console.log("req,,,,,,,,,,,,,,,,,,,,", req.body);
  try {
    return await getAllTestsOfAPatientServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

exports.getATestOfAPatient = async (req, res) => {
  // console.log("req,,,,,,,,,,,,,,,,,,,,", req.body);
  try {
    return await getATestOfAPatientServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

exports.addATestOfAPatient = async (req, res) => {
  // console.log("req,,,,,,,,,,,,,,,,,,,,", req.body);
  try {
    return await addATestOfAPatientServiceFunc(req, res);
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};