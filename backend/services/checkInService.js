const checkIn = require("../models/checkInModel")

const getAllCheckIn = async () => {

   return await checkIn.find().sort({ createdAt: -1 });
}

const createCheckIn = async ({ date , time , status }) => {

if( !date || !status || !time ){
        throw new Error("Date, time, and status are required");
}
const validStatuses = ["pending", "approved", "rejected"];
 if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  };

  return await checkIn.create({ date , time , status })

}

module.exports={
    getAllCheckIn,
    createCheckIn
}