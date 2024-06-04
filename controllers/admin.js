const { StatusCodes } = require('http-status-codes')
const customErrorAPI = require('../customError/customError')
const AdminModel=require('../models/adminModel')

const createAdmin=async(req,res)=>{
    const {username,password}=req.body

    const usernameExist= await AdminModel.findOne({username:username})

    if(!username){
        throw new customErrorAPI("Enter a Username",StatusCodes.BAD_REQUEST)
    }
    if(!password){
        throw new customErrorAPI("Enter a password",StatusCodes.BAD_REQUEST)
    }

    if(usernameExist){
        throw new customErrorAPI("username already exits",StatusCodes.CONFLICT)
    }


       const createAdmin=await AdminModel.create(req.body)

       res.status(StatusCodes.OK).json(createAdmin)
    
    }

    const loginAdmin=async(req,res)=>{

        const {username,password}=req.body
        const user= await AdminModel.findOne({username:username})

        if(!user){
            throw new customErrorAPI("No such username Exists",StatusCodes.CONFLICT)
        }

        const isMatch= await user.verifyPassword(password)
        if(!isMatch){
            throw new customErrorAPI("Wrong Password",StatusCodes.BAD_REQUEST)
            
        }
        const token=await user.signJWT()
            res.status(StatusCodes.OK).json({token:token})
    }

    module.exports={createAdmin,loginAdmin}

