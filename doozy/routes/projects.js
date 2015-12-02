var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projectController');

// Gets all projects
router.get('/', projectController.allProjects);

// Get a project by Id
router.get('/:id', projectController.getProjectById);

// Gets all projects for an organization
router.get('/org/:orgId', projectController.getProjectsByOrg);

// To add a project to an organization
router.post('/create', projectController.createProjectByOrg);

// Update a project
router.put('/', projectController.updateProject);

// Delete a Project
router.delete('/:id', projectController.removeProject);

module.exports = router;
