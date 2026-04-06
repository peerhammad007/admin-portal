const express = require('express');
const { getPolicies, getPolicyById, createPolicy, getPolicyStats } = require('../policies/policy.controller');
const router = express.Router();

router.get('/policy', getPolicies);
router.get('/policy/:id', getPolicyById);
router.post('/policy', createPolicy);
router.get('/policy/stats', getPolicyStats)

module.exports = router