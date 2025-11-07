const checkOutService=require("../services/checkOutService");

exports.getAllCheckOut = async ( req , res) => {
try {
    const checkOut= await checkOutService.getAllCheckOuts();
    res.status(200).json({ checkOut });
} catch (error) {
    console.error("Error fetching check-out:", error);
    res.status(500).json({ error: "Failed to fetch check-our history" });
}

};

exports.createCheckOut = async ( req , res ) => {
    try {
        const {endDate,endTime}=req.body;
        const checkOut= await checkOutService.createCheckOut({endDate,endTime});
        res.status(201).json({ message: "Check-out saved successfully!",checkOut });

    } catch (error) {
         console.error("Error saving check-out:", error);
    res.status(400).json({ error: error.message });
    }
} ;

exports.deleteCheckOutById = async ( req , res ) => {
    try {
        const {id} = req.params;
        const result = await checkOutService.deleteCheckOutById(id);  
   res.status(201).json({ message:result });
    } catch (error) {
          console.error("Error deleting check-out:", error);
    res.status(400).json({ error: error.message });
    }
};

