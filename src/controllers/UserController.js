import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Users {

    static registerUser = async (req, res) => {

        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists)
        return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const  user = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        });

        try {
            await user.save();
            res.status(200).json({user: user._id});
        } catch (err) {
            res.status(400).send(err);
        }

    }

    static userLogin = async (req, res) => {
            const user = await User.findOne({email: req.body.email})
            if(!user) return res.status(400).json({message:'Incorrect email'});

            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass) return res.status(400).json({message: 'Incorrect passoword'});

            const token = jwt.sign({ user : {id: user.id, username : user.username}}, process.env.TOKEN_SECRET, {expiresIn:3600});
            res.header('auth-token', token);

            res.status(200).json({success: 'Logged in successfully :', accessToken: token})

    }

    static getUsers = async (req, res) => {

        try {
            const users = await User.find();
            res.status(200).json({users,}
            );
        } catch (error) {
            res.status(404).send(error);
        }
        
    }
    static getUser = async (req, res) =>{
        try {
            let profile = await User.findById(req.user.id)

            if(!profile){
                return res.status(404).json({
                    message : "Profile not found",
                });
            }

            return res.status(200).json(
                {profile :{
                    username : profile.username,
                    USD : profile.USD,
                    EUR : profile.EUR,
                    NGN : profile.NGN
                }
            });
    
        } catch (error) {
            return res.status(404).json({
                message : "An error has occured",
            });
        }
    }

    static updateUser = async(email, role, amount, currency) =>{
        try {
            
            let profile = await User.findOne({email: email})
            if(!profile){
                return res.status(404).json({
                    message : "Check the profile and try again",
                });
            }
            if(currency =="USD" ){
                const updatedAmount =(role==="sender")? 
                (parseInt(profile.USD) - parseInt(amount)):
                ((role==="receiver")?
                (parseInt(profile.USD)+ parseInt(amount)):(console.log('simbyumva!!!')))
                const res = await User.updateOne(
                { email: profile.email },
                { $set: { USD: updatedAmount } },
                { upsert: false }
                );

            } else if(currency =="EUR"){
                const updatedAmount =(role==="sender")? 
                (parseInt(profile.EUR) - parseInt(amount)):
                ((role==="receiver")?
                (parseInt(profile.EUR)+ parseInt(amount)):(console.log('simbyumva!!!')))
                const res = await User.updateOne(
                { email: profile.email },
                { $set: { EUR: updatedAmount } },
                { upsert: false }
                );
            }else if(currency="NGN"){
                const updatedAmount =(role==="sender")? 
                (parseInt(profile.NGN) - parseInt(amount)):
                ((role==="receiver")?
                (parseInt(profile.NGN)+ parseInt(amount)):(console.log('simbyumva!!!')))
                const res = await User.updateOne(
                { email: profile.email },
                { $set: { NGN: updatedAmount } },
                { upsert: false }
                );
            }
    
        } catch (error) {
            return res.status(404).json({
                message : "Profile not found",
            });
        }
    }
}

export default Users;