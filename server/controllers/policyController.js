const Policy = require("../models/Policy");

const getPolicies = async (req, res) => {
  try {
    const { page = 1, limit = 20, sort, status, search } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { policyNumber: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortOption = {};

    if (sort) {
      const allowedFields = ["createdAt", "premiumAmount"];
      const [field, order] = sort.split(":");
      if (allowedFields.includes(field)) {
        sortOption[field] = order === "asc" ? 1 : -1;
      }
    }
    const [policies, total] = await Promise.all([
      Policy.find(query).skip(skip).limit(Number(limit)).sort(sortOption),
      Policy.countDocuments(query),
    ]);

    res.json({
      policies,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });
    res.json(policy);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const createPolicy = async (req, res) => {
  try {
    const {policyNumber, customerName, email, vehicleType, vehicleYear, premiumAmount, status} = req.body;
    if(!policyNumber || !customerName || !email || !vehicleType || !vehicleYear || !premiumAmount || !status) {
      return res.status(400).json({message: 'missing required fields'});
    }
    
    const existing = await Policy.findOne({policyNumber});
    if(existing) return res.status(400).json({message: 'Policy already exists'});

    const policy = new Policy({...req.body});
    await policy.save()
    res.status(201).json(policy);

  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = { getPolicies, getPolicyById, createPolicy };
