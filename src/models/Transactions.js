import mongoose from 'mongoose';

const TransactionSchema = mongoose.Schema({

    senderId : {
        type: 'string',
        required: true,
        min: 6,
        max: 255
    },

    senderEmail : {
        type: 'string',
        required: true,
        min: 6,
        max: 255
    },

    receiverEmail : {
        type: 'string',
        required: true,
        min: 6,
        max: 255
    },

    sendingAmount : {
        type: 'string',
        required: true,
        max: 1024
    },

    convertedAmount : {
        type: 'string',
        default: '1000',
    },

    sendingCurrency : {
        type: 'string',
        default: '0',
    },

    receivingCurrency : {
        type: 'string',
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

export default mongoose.model('Transactions', TransactionSchema);
