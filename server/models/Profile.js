const mongoose=require('mongoose');

const ProfileSchema=new mongoose.Schema({
    gender:{
        type:String,
        require:true
    },
    dateOfBirth:{
        type:String,
        require:true
    },
    about:{
        type:String,
        require:true
    },
    contactNumber:{
        type:String,
        trim:true
    },
})

module.exports=mongoose.model("Profile",ProfileSchema);

