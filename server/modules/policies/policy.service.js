const policyRepository = require("./policy.repository");

const getPolicies = async (queryParams) => {
  const { page = 1, limit = 20, sort, status, search } = queryParams;

  const query = {};
  if (status) {
    query.status = status;
  }
  if (search) {
    query.$or = [
      { customerName: { $regex: search, $options: "i" } },
      { policyNumber: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortOpt = {};

  if (sort) {
    const allowedFields = ["createdAt", "premiumAmount"];
    const [field, order] = sort.split(":");
    if (allowedFields.includes(field)) {
      sortOpt[field] = order === asc ? 1 : -1;
    }
  }

  const [policies, total] = await Promise.all([
    policyRepository.findPolicies({ query, skip, limit, sortOpt }),
    policyRepository.countPolicies(query),
  ]);

  return {
    policies,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: total,
      pages: Math.ceil(total / Number(limit)),
    },
  };
};

const getPolicyById = async (id) => {
  const policy = await policyRepository.findPolicyById(id);
  if (!policy) {
    const error = new Error("Policy not found");
    error.statusCode = 404;
    throw error;
  }
  return policy;
};

const createPolicy = async (data) => {
  const existing = await policyRepository.findPolicyByNumber(data.policyNumber);
  if (existing) {
    const error = new Error("Policy already exists");
    error.statusCode = 400;
    throw error;
  }
  return policyRepository.createPolicy(data);
};

const getPolicyStats = async () => {
  const stats = await policyRepository.getPolicyStats();
  const result = {
    totalPolicies: 0,
    activePolicies: 0,
    pendingPolicies: 0,
    expiredPolicies: 0,
    totalPremium: 0,
  };

  stats.forEach((item) => {
    result.totalPolicies += item.count;
    result.totalPremium += item.premiumAmount;

    if (item.status === "active") result.activePolicies = item.count;
    if (item.status === "pending") result.pendingPolicies = item.count;
    if (item.status === "expired") result.expiredPolicies = item.count;
  });
  return result;
};

module.exports = {
  getPolicies,
  getPolicyById,
  createPolicy,
  getPolicyStats,
};
