const User = require('../models/Users');
const ShopUser = require('../models/shopUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/**
 * this bcrypt will help for password store in the hashing or salting
 */

//register controller 
const registerUser= async (req,res)=>{
    try {
        //extract user information from the request body
        const {username,email,phone,dob,password,role} = req.body;
        //check if the user is already exists in our database and the $or method will check username and email
        const checkExistingUser= await User.findOne({$or:[{phone},{email}]})

        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User is already exists with same email . Please try with a different email'
            })
        }

        //hash user password
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        //create a new user and save in the database
        const newlyCreatedUser = new User({
            username,
            email,
            phone,
            dob,
            password : hashedPassword,
            role : role || 'user',
        })

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success : true,
                message : 'User register successfully'
            })
        }else{
            res.status(400).json({
                success : false,
                message : 'Unable to register User ! Please try again '
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occoured ! please try again ',
        });
    }
}

//login controller
const loginUser= async (req,res)=>{
    try {
        const {email,password} = req.body;
        
        //checking the user name is exist or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User doesnot exist !'
            })
        }
        //checking the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'Invalid username and password'
            })
        }
        // create a user token JWT in the sign pass the user information not stored password
        const accessToken =jwt.sign({
            userId : user._id,
            username : user.username,
            email : user.email,
            phone : user.phone,
            dob:user.dob,
            role : user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn : '15m'
        });

        res.status(200).json({
            success : true,
            message : 'Logged in successful',
            accessToken,
            user : {
                userId : user._id,
                username : user.username,
                email : user.email,
                phone : user.phone,
                dob :user.dob,
                role : user.role
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occoured ! please try again ',
        });
    }
}

const shopRegisterUser=async (req,res)=>{
    try {
        //extract user information from the request body
        const {username,email,phone,dob,password,role,city,state,shopname} = req.body;
        //check if the user is already exists in our database and the $or method will check username and email
        const checkExistingUser= await ShopUser.findOne({$or:[{phone},{email}]})

        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User is already exists with same email . Please try with a different email'
            })
        }

        //hash user password
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        //create a new user and save in the database
        const newlyCreatedUser = new ShopUser({
            username,
            email,
            phone,
            dob,
            password : hashedPassword,
            role : role || 'shop',
            city,
            state,
            shopname 
        })

        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success : true,
                message : 'User register successfully'
            })
        }else{
            res.status(400).json({
                success : false,
                message : 'Unable to register User ! Please try again '
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occoured ! please try again ',
        });
    }
}

const shopUserLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        
        //checking the user name is exist or not
        const user = await ShopUser.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User doesnot exist !'
            })
        }
        //checking the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'Invalid username and password'
            })
        }
        // create a user token JWT in the sign pass the user information not stored password
        const accessToken =jwt.sign({
            userId : user._id,
            username : user.username,
            phone : user.phone,
            dob : user.dob,
            role : user.role,
            shopname : user.shopname,
            city : user.city,
            state : user.state,
        },process.env.JWT_SECRET_KEY,{
            expiresIn : '15m'
        });

        res.status(200).json({
            success : true,
            message : 'Logged in successful',
            accessToken,
            user : {
                userId : user._id,
                username : user.username,
                phone : user.phone,
                dob : user.dob,
                role : user.role,
                shopname : user.shopname,
                city : user.city,
                state : user.state
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occoured ! please try again ',
        });
    }
}

module.exports = {registerUser,loginUser,shopRegisterUser,shopUserLogin};