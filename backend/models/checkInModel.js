const mongoose=require("mongoose");

const checkInSchema=new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ["pending","approved","rejected"]
    },
},
{
    timestamps:true,
    collection:"check-In",
}
);

const checkIn=mongoose.model("checkIn",checkInSchema);

module.exports=checkIn;