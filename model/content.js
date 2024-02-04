const mongoose = require("mongoose")

const content = new mongoose.Schema({
    title:{
        require:true,
        type:String
    },
    description:{
        require:true,
        type:String
    },
    contentLink:{
        require:true,
        type:String
    }
})

module.exports = mongoose.model("content",content)