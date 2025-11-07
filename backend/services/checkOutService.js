const checkOutModel = require("../models/checkOutModel");

const getAllCheckOuts = async () => {
    try {
        const checkOut=await checkOutModel.find();
         return { success: true, data: checkOut };
    } catch (error) {
        console.error("Service Error - getAllCheckOuts:", error);
    return { success: false, error: "Failed to fetch check-out history" };
    }
};

const createCheckOut = async ({ endDate, endTime }) => {
try {
    if (!endDate || !endTime) {
      return { success: false, error: "Date and time are required" };
    }

    const checkOut =await checkOutModel.create({ endDate, endTime });
    return { success: true, message: "Check-out saved successfully!",checkOut };
} catch (error) {
     console.error("Service Error - createCheckOut:", error);
    return { success: false, error: "Failed to save check-out" };
}
};

const deleteCheckOutById = async (id)=> {
try {
    const deleted = await checkOutModel.findByIdAndDelete(id);
     if (!deleted) {
      return { success: false, error: "Check-out not found" };
    }
   return { success: true, message: "Check-out deleted successfully!" };
    
} catch (error) {
    console.error("Service Error - deleteCheckOutById:", error);
    return { success: false, error: "Failed to delete check-out" };
}
};

module.exports={
    getAllCheckOuts,
    createCheckOut,
    deleteCheckOutById
}