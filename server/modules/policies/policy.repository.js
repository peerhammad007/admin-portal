const Policy = require("./policy.model");

const findPolicies = async ({ query, skip, limit, sortOption }) => {
  return Policy.find(query).skip(skip).limit(limit).sort(sortOption).lean();
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

module.exports = {
  findPolicies,
  countPolicies,
  findPolicyById,
  findPolicyByNumber,
  createPolicy,
};
