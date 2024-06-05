const { StatusCodes } = require('http-status-codes')
const customErrorAPI = require('../customError/customError')
const AdminModel=require('../models/adminModel')
const nodemailer = require('nodemailer');

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



const sendEmail = async (req, res, next) => {
    const { name, email, phoneNumber, subject, message } = req.body;

    if (!name || !email || !phoneNumber || !subject || !message) {
        throw new customErrorAPI('All fields are required', 400);
    }
    console.log(process.env.EMAIL_PASS)
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // e.g., smtp.gmail.com for Gmail
        port: 587, // or 465 for secure connection
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'support@vipsrefunds.com', // your email
            pass: process.env.EMAIL_PASS, // your email password
        },
    });

    const mailOptions = {
        from:'support@vipsrefunds.com',
        to: 'support@vipsrefunds.com', // your receiving email
        subject: subject,
        html: `
            <html>
            <head>
                <style>
                    .email-container {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    .email-header {
                        background-color: #f7f7f7;
                        padding: 10px;
                        border-bottom: 1px solid #ccc;
                    }
                    .email-body {
                        padding: 20px;
                    }
                    .email-footer {
                        margin-top: 20px;
                        padding-top: 10px;
                        border-top: 1px solid #ccc;
                        font-size: 0.9em;
                        color: #777;
                    }
                    .label {
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">
                        <h2>${subject}</h2>
                    </div>
                    <div class="email-body">
                        <p><span class="label">Name:</span> ${name}</p>
                        <p><span class="label">Email:</span> ${email}</p>
                        <p><span class="label">Phone Number:</span> ${phoneNumber}</p>
                        <p><span class="label">Message:</span></p>
                        <p>${message}</p>
                    </div>
                    <div class="email-footer">
                        <p>This email was sent from your website's contact form.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.log(error)
        next(new customErrorAPI('Email could not be sent', 500));
    }
};



    module.exports={createAdmin,loginAdmin,sendEmail}

