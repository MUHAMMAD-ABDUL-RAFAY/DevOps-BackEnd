const mongoose = require('mongoose')
const VideoSchema = new mongoose.Schema({
    videoname: {
        type: String,
    },
    videolink: {
        type: String,
        
    },
    username : {
        type: String,
    },
});

module.exports = mongoose.model.Videos || mongoose.model('Video', VideoSchema);