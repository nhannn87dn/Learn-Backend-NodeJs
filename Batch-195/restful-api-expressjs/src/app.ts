import express from 'express'
import type { Express } from 'express'
import { getEnv } from './common/configs/env'

const app: Express = express();
const PORT = getEnv().PORT;

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})