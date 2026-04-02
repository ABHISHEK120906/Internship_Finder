const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmap.controller');

// Claude AI Endpoints
router.post('/claude/personal-plan', roadmapController.generatePersonalRoadmap);
router.post('/claude/explain', roadmapController.explainTechnology);
router.post('/claude/doubt-solver', roadmapController.solveDoubt);
router.post('/claude/certificate-path', roadmapController.planCertificatePath);

// Progress Endpoints
router.get('/progress/:fieldId', roadmapController.getProgress);
router.put('/progress/:fieldId', roadmapController.updateProgress);

// Certificates Endpoints
router.post('/certificates', roadmapController.addCertificate);
router.get('/certificates', roadmapController.getCertificates);

module.exports = router;
