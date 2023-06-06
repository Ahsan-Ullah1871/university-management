import express from 'express'
import cors from 'cors'
import global_error_handler from './app/middlewares/globalErrorHandler'
import { UserRoute } from './app/modules/users/user.routes'
const app = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', UserRoute)

// Error

// testing
// app.get('/', (req, res, next) => {})

// Global error
app.use(global_error_handler)

export default app
