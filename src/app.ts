require('dotenv').config()
import express, {Request, Response} from 'express'
import morgan from 'morgan'

const app = express()
app.use(morgan('combined'))

app.get('/test', (req, res: Response) => {
  res.json('ok')
})

app.listen(process.env.SERVER_PORT, () => console.log('Listening on PORT ' + process.env.SERVER_PORT))

export default app