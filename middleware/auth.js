const { StatusCodes } = require("http-status-codes")
const customErrorAPI = require("../customError/customError")
const JWT = require("jsonwebtoken")



const authenticate=async(req,res,next)=>{

    const {authorization}=req.headers
    const token=authorization.split(' ')[1]

    if(!token){
        throw new customErrorAPI('You Must Be Logged In',StatusCodes.BAD_REQUEST)

    }
    try{
        const payload=JWT.verify(token,process.env.JWT_SECRET)
        req.user=payload
        next();

    }catch(error){
        console.log(error)
        throw new customErrorAPI("Invalid Token",StatusCodes.UNAUTHORIZED)

    }

}
module.exports=authenticate