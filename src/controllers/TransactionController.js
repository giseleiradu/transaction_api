import Transaction from '../models/Transactions';
import jwt from 'jsonwebtoken';
import User from '../models/Users';
import Users from '../controllers/UserController';

class TransactionController {
    
    static transact = async (req, res) => {
        try {
            
            let senderProfile = await User.findById(req.user.id)

            const validateTransaction = {
                senderId: senderProfile.id,
                senderEmail : senderProfile.email,
                receiverEmail : req.body.receiverEmail,
                sendingAmount : req.body.sendingAmount,
                convertedAmount : req.body.convertedAmount,
                sendingCurrency : req.body.sendingCurrency,
                receivingCurrency : req.body.receivingCurrency,
            }
                
            if((validateTransaction.sendingCurrency == 'USD') && (parseInt(validateTransaction.sendingAmount) > parseInt(senderProfile.USD))) return res.status(400).json({message: 'Insufficient fund'});

            if((validateTransaction.sendingCurrency == 'EUR') && (parseInt(validateTransaction.sendingAmount) > parseInt(senderProfile.EUR))) return res.status(400).json({message: 'Insufficient fund'});

            if((validateTransaction.sendingCurrency == 'NGN') && (parseInt(validateTransaction.sendingAmount) > parseInt(senderProfile.NGN))) return res.status(400).json({message: 'Insufficient fund'});

            const transaction = new Transaction(
                validateTransaction,
            )

            await transaction.save()
            const sender = await Users.updateUser(
                transaction.senderEmail,
                "sender",
                transaction.sendingAmount,
                transaction.sendingCurrency,
            )
            const receiver = await Users.updateUser(
                transaction.receiverEmail,
                "receiver",
                transaction.convertedAmount,
                transaction.receivingCurrency,
            )

            res.status(200).json({ transaction });
            
            } catch (error) {
            res.status(error.status).json({
                error,
            })
            console.log(error)
        }

    }

    static getAllTransactions = async (req, res) => {
        try {
            let transactions = await Transaction.find();
            res.status(200).json({ transactions });
        }
         catch (error) {
            res.status(404).json({message: error});
        }

    }

}

export default TransactionController;
