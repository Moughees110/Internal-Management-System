const checkInService=require("../services/checkInService");

exports.getAllCheckIn = async ( req , res ) => {
    try {
        
     const checkIn=await checkInService.getAllCheckIn();
      res.status(200).json({ checkIn });

    } catch (error) {
        
     console.error("Error fetching check-ins:", error);
    res.status(500).json({ error: "Failed to fetch check-in history" });

    }
};

exports.createCheckIn = async ( req , res ) => {
try {
    const { date , time , status }=req.body;
    const checkIn= await checkInService.createCheckIn( { date , time ,status });
    res.status(201).json({ message: "Check-in saved successfully!",checkIn });

} catch (error) {
    console.error("Error saving check-in:", error);
    res.status(400).json({ error: error.message });
}

};