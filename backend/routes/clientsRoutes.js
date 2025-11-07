const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.post('/addClient', clientController.addOrUpdateClient);

router.get('/getClients', clientController.getAllClients);

router.delete('/deleteClient/:id', clientController.deleteClient);

module.exports = router;
