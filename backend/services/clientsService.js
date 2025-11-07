
const clientModel = require("../models/clientModel");
const VALID_TYPES = ["Basic", "Standard", "Premium"];

const getAllClients = async () => {
    return await clientModel.find().sort({ createdAt: -1 });
};

const addOrUpdateClient = async ({ id, name, rate, frequency, type }) => {
    if(!name || !rate || !frequency || !type){
        throw new Error("Name, Rate, Frequency, and type are required");
    };
    if(!VALID_TYPES.includes(type)){
         throw new Error("Invalid Client  type ,Allowed Values : Basic, Standard, Premium");  
    };
    
    const clientData = {name, rate, frequency, type};

    if(id){
        const updateClientData= await clientModel.findByIdAndUpdate(id, clientData, {
            new: true,
            runValidators: true,
        });
        if(!updateClientData){
        throw new Error("client not found")
    }
    
    return { message: "Client updated successfully", client: updateClientData };
    }else{
        const newClient = await clientModel.create(clientData);
        return {message: "client created successfully", client: newClient}
    }

};

const deleteClientById = async (id) => {
    const deletedClient = await clientModel.findByIdAndDelete(id);
    if(!deletedClient){
        throw new Error(" Client not found ");
    };
    return {message: "client deleted successfully ",  clientModel: deletedClient};

};

module.exports ={
    getAllClients,
    addOrUpdateClient,
    deleteClientById,
}