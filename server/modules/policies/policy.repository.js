const Policy = require("./policy.model");

const findPolicies = async ({ query, skip, limit, sortOption }) => {
  return Policy.find(query)
    .select("policyNumber customerName premiumAmount status createdAt")
    .skip(skip)
    .limit(limit)
    .sort(sortOption)
    .lean();
};

const countPolicies = async (query) => {
  return Policy.countDocuments(query);
};

const findPolicyById = async (id) => {
  return Policy.findById(id);
};

const findPolicyByNumber = async (policyNumber) => {
  return Policy.find({ policyNumber });
};

const createPolicy = async () => {
  return Policy.create(data);
};
const getPolicyStats = async () => {
  return Policy.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalPremium: { $sum: "$premiumAmount" },
      },
    },
  ]);
};
module.exports = {
  findPolicies,
  countPolicies,
  findPolicyById,
  findPolicyByNumber,
  createPolicy,
  getPolicyStats,
};
