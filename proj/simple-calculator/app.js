import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

// Initiliase paths

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIEW_PATH = path.join(__dirname, 'views/');

// Initialise app

const app = express()
app.set('port', 8080)

// End points

app.get('/', (req, res) => {
    res.sendFile(VIEW_PATH + "index.html")
})

app.get('/info', (req, res) => {
    res.sendFile(VIEW_PATH + "info.html")
})

app.get('/add/:x/:y', (req, res) => {
    try {
        const x = parseInt(req.params.x)
        const y = parseInt(req.params.y)

        if (isNaN(x) || isNaN(y)) {
            throw Error("Either argument is not a number")
        }

        res.send(`${x} + ${y} is ${x + y}`)
    } catch (error) {
        res.send("Error: " + error.message)
    }
})

app.get("/sub", (req, res) => {
    try {
        const x = parseInt(req.query.x)
        const y = parseInt(req.query.y)

        console.log(x, y)

        if (isNaN(x) || isNaN(y)) {
            throw Error("Either argument is not a number")
        }

        res.send(`${x} - ${y} is ${x - y}`)
    } catch (error) {
        res.send("Error: " + error.message)
    }
})

app.listen(app.get('port'), () => console.log("Listening at http://localhost:8080"))