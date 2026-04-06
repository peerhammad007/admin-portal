const policyService = require("./policy.service");

const getPolicies = async (req, res, next) => {
  try {
    const data = await policyService.getPolicies(req.query);
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
};

const getPolicyById = async (req, res, next) => {
  try {
    const policy = await policyService.getPolicyById(req.params.id);
    res.json({ success: true, data: policy });
  } catch (err) {
    next(err);
  }
};

const createPolicy = async (req, res, next) => {
  try {
    const policy = await policyService.createPolicy(req.body);
    res.status(201).json({ success: true, data: policy });
  } catch (err) {
    next(err);
  }
};

const getPolicyStats = async (req, res, next) => {
  try {
    const stats = await policyService.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPolicies,
  getPolicyById,
  createPolicy,
  getPolicyStats,
};
