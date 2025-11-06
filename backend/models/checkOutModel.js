const mongoose=require("mongoose");

const checkOutSchema = new mongoose.Schema({
    endDate:{
    type : String,
    requird: true
    },
    endTime:{
        type: String,
        required: true,
    },
},
 {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "check-Out", // MongoDB collection name
  }
);

const checkOut=mongoose.model("checkOut",checkOutSchema);

module.exports=checkOut;