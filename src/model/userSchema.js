const mongose = require('mongoose');

const userSchema = new mongose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String ,
        unique: true, 
        required: true 
    },
    phone: {
        type: Number,
        unique: true,
    },
    password: { 
        type: String,
        required: true   
    },
});

module.exports = mongose.model('User', userSchema);