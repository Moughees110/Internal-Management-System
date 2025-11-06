const Client = require('../models/client');

const VALID_TYPES = ['Basic', 'Standard', 'Premium'];

const getAllClients = async () => {
  return await Client.findAll();
};

const addOrUpdateClient = async ({ id, name, rate, frequency, type }) => {
  if (!name || !rate || !frequency || !type) {
    throw new Error("Name, rate, frequency, and type are required");
  }

  if (!VALID_TYPES.includes(type)) {
    throw new Error("Invalid client type. Allowed values: Basic, Standard, Premium");
  }

  const clientData = { name, rate, frequency, type };

  if (id) {
    const existingClient = await Client.findByPk(id);
    if (!existingClient) {
      throw new Error("Client not found");
    }
    await existingClient.update(clientData);
    return { message: "Client updated successfully" };
  } else {
    await Client.create(clientData);
    return { message: "Client created successfully" };
  }
};

const deleteClient = async (id) => {
  const client = await Client.findByPk(id);
  if (!client) {
    throw new Error("Client not found");
  }
  await client.destroy();
  return { message: "Client deleted successfully" };
};

module.exports = {
  getAllClients,
  addOrUpdateClient,
  deleteClient,
};


