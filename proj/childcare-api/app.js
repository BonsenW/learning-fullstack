import express from 'express'
import teacherRouter from './routers/teacher-routes.js'

// Initialise App

const app = express()
app.set('port', 8080)
app.use(express.json())

// Initialise Routers

app.use('/teacher', teacherRouter)
// app.use('/kid', kidRouter)

// Start Server

app.listen(app.get('port'), () => {
    console.log(`Listening in at http://localhost:${app.get('port')}`)
})