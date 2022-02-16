import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username : {
        type: 'string',
        min: 3,
        max: 20
    },

    email : {
        type: 'string',
        min: 6,
        max: 20
    },

    password : {
        type: 'string',
        max: 1024
    },

    USD : {
        type: 'string',
        default: 1000,
    },

    EUR : {
        type: 'string',
        default: 0,
    },

    NGN : {
       type: 'string',
        default: 0,
    },

    createdDate : {
        type: Date,
        default: Date.now
    },

    updatedDate : {
        type: Date,
        default: Date.now
    },

});

export default mongoose.model('Users', userSchema);