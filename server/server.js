import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import {fileURLToPath} from 'url'
import path from 'path'
import UserRoutes from './Routes/User.js'
import TaskRoutes from './Routes/Task.js'
import { Register } from './Controllers/User.js'
import tasks from './data/tasks.js'
import Task from './models/Task.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors({origin:'http://localhost:3000', credentials: true}))
app.use(cookieParser())

app.use('/assets', express.static(path.join(__dirname , 'public/assets')))

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null , 'public/assets')
    },
    filename: function(req,file,cb) {
        const picturePath = new Date().toISOString().replace(/:/g ,'-') + file.originalname
        req.body.picturePath = picturePath
        cb(null , picturePath)
    }
})

const upload = multer({storage})


app.use('/auth/register', upload.single('picture'), Register)
app.use('/auth', UserRoutes)
app.use('/task', TaskRoutes)
app.get('/', (req,res) => {
    res.send('This is a vercel response')
})
dotenv.config()

app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong'
    return res.status(status).json({message})
})

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_DB).then(() => {
    app.listen(PORT , () => {
        //One time insertion to Db
      //  Task.insertMany(tasks)
        console.log(`app is listening to PORT ${PORT}`)
    })
}).catch((err) => {
 console.log(err)
})