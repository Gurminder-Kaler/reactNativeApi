const messages = require("@constants/messages");
const User = require("@models/userModel");
const TestRecord = require("@models/testRecordModel");

const getAllTestsOfAPatientServiceFunc = async (req, res) => {

    TestRecord.find({
        userId: req.params.patientId
    })
        .select("-deletedAt")
        .exec()
        .then((docs) => {
            return res.json({
                success: true,
                status: 200,
                message: messages.SUCCESS.TEST.ALL,
                data: docs.map((doc) => {
                    return {
                        _id: doc && doc._id,
                        risk: doc && doc.risk,
                        bloodPressureLow: doc && doc.bloodPressureLow,
                        bloodPressureHigh: doc && doc.bloodPressureHigh,
                        respiratoryRate: doc && doc.respiratoryRate,
                        createdAt: doc && doc.createdAt,
                        updatedAt: doc && doc.updatedAt,
                    };
                }),
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                status: 500,
                message: err,
            });
        });
};


const addATestOfAPatientServiceFunc = async (req, res) => {
    try {
        let testVar = new TestRecord({
            _id: new mongoose.Types.ObjectId(),
            risk: req.body.risk,
            bloodPressureLow: req.body.bloodPressureLow,
            bloodPressureHigh: req.body.bloodPressureHigh,
            respiratoryRate: req.body.respiratoryRate
        });
        testVar.save().then((result) => {
            // console.log("result111", result);
            if (result) {
                return res.json({
                    status: 200,
                    success: true,
                    message: messages.SUCCESS.TEST.ADDED,
                    token: token,
                    data: {
                        id: result._id,
                        risk: result.risk,
                        bloodPressureLow: result.bloodPressureLow,
                        bloodPressureHigh: result.bloodPressureHigh,
                        respiratoryRate: result.respiratoryRate,
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt,

                    },
                });
            }
        });
        // console.log("77");
    } catch (err) {
        return res.json({
            status: 500,
            success: false,
            message: "err",
        });
    }
};


const testService = (module.exports = {
    getAllTestsOfAPatientServiceFunc,
    addATestOfAPatientServiceFunc
});
