const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/addClient', clientController.addUpdateClient);

router.get('/getClients', clientController.getAllClients);

router.delete('/deleteClient/:id', clientController.deleteClient);

module.exports = router;
