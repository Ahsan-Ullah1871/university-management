import express, { Request, Response } from 'express'
import cors from 'cors'
import user_router from './app/modules/users/user.routes'
const app = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', user_router)
// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working succcessfully')
})

export default app
