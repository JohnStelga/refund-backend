const express=require('express')
require('dotenv').config()
require('express-async-errors')
const bodyParser=require('body-parser')
const connectDB=require('./db/connectDB')
const notFoundMiddleware=require('./middleware/notFound')
const errorMiddleware=require('./middleware/error')
const adminRoutes=require('./routes/admin')
const refundRoutes=require('./routes/refund')
const cors=require('cors')


const app=express()
const port=process.env.PORT||5000
const start=async()=>{
    try {
        await connectDB(process.env.MONGOOSE_URI)
        app.listen(port,console.log("DB connected and app running on port 5000"))
    } catch (error) {
        console.log(error)
    }
}

start()

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRoutes)
app.use('/api/refund',refundRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


