const messages = require("@constants/messages");
const mongoose = require("mongoose");
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

const getATestOfAPatientServiceFunc = async (req, res) => {

    TestRecord.findOne({
        _id: req.params.testId
    })
        .select("-deletedAt")
        .exec()
        .then((doc) => {
            User.findOne({ _id: doc.userId }).then((user) => {
                return res.json({
                    success: true,
                    status: 200,
                    message: messages.SUCCESS.TEST.ALL,
                    data: {
                        _id: doc && doc._id,
                        patient: user,
                        risk: doc && doc.risk,
                        bloodPressureLow: doc && doc.bloodPressureLow,
                        bloodPressureHigh: doc && doc.bloodPressureHigh,
                        respiratoryRate: doc && doc.respiratoryRate,
                        createdAt: doc && doc.createdAt,
                        updatedAt: doc && doc.updatedAt,
                    }
                });
            }).catch((err) => {
                return res.json({
                    success: false,
                    status: 500,
                    message: err,
                });
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
            respiratoryRate: req.body.respiratoryRate,
            userId: req.params.patientId
        });
        testVar.save().then((result) => {

            if (result) {
                TestRecord.find({ userId: req.params.patientId }).then((tests) => {
                    if (tests) {
                        return res.json({
                            status: 200,
                            success: true,
                            message: messages.SUCCESS.TEST.ADDED,
                            data: tests
                        });
                    }
                });
            }
        });

    } catch (err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
};


const testService = (module.exports = {
    getAllTestsOfAPatientServiceFunc,
    getATestOfAPatientServiceFunc,
    addATestOfAPatientServiceFunc
});
