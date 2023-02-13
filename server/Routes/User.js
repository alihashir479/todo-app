import express from 'express'
import { Login } from '../Controllers/User.js'
const Router = express.Router()

Router.post('/login', Login)

export default Router