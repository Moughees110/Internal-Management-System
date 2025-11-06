const clientService = require('../services/clientService');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.json({ clientList: clients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addUpdateClient = async (req, res) => {
  try {
    const result = await clientService.addOrUpdateClient(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clientService.deleteClient(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
