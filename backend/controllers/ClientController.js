const clientService = require("../services/clientsService");

exports.getAllClients = async ( req, res ) => {
    try {
        const clients = await clientService.getAllClients();
        res.json({ clientList: clients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addOrUpdateClient = async (req, res) => {
    try {
         const { id, name, rate, frequency, type } = req.body;
    const result = await clientService.addOrUpdateClient({id,name,rate,frequency,type});
     res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clientService.deleteClientById(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
