const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');

router.get('/getProjects', projectController.getAllProjects);
router.get('/getProjectById/:id', projectController.getProjectById);

// Add multer middleware to handle single file upload
router.post('/addProject', upload.single('attachment'), projectController.addUpdateProject);

router.delete('/deleteProject/:id', projectController.deleteProject);

module.exports = router;
