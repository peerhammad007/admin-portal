const express = require('express');
const { getPolicies, getPolicyById, createPolicy } = require('../controllers/policyController');
const router = express.Router();

router.get('/policy', getPolicies);
router.get('/policy/:id', getPolicyById);
router.post('/policy', createPolicy);

module.exports = router