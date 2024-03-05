const mongoose=require("mongoose")



//db schema for user sso

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAt => dateFormat(createdAt, 'mm/dd/yyyy HH:MM:ss')
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
module.exports=mongoose.model("User",userSchema);