import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

// Initialising Database

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = path.join(__dirname, "db.json")

const readFromDB = async () => {
    const data = await fs.readFile(DB_PATH, 'utf8')
    return JSON.parse(data)
}

const writeToDB = async (newDB) => {
    await fs.writeFile(DB_PATH, JSON.stringify(newDB, null, 2))
}

// Initialising App

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    try {
        const data = await readFromDB()

        if (!data) {
            throw new Error("Unable to access database")
        }

        // Although its better to do this in a GET, im GETting lazy
        res.status(200).send({ trendingMovies: data.movies.slice(0, 6) })
    } catch (error) {
        console.error("Error: " + error)
    }
})

app.post('/', async (req, res) => {
    try {
        const { id, title, poster_path } = req.body

        if (!id) {
            throw new Error("Movie Id Not Present")
        }

        const data = await readFromDB()

        if (!data) {
            throw new Error("Unable to access database")
        }

        const movieIdx = data.movies.findIndex(movie => movie.id === id)

        if (movieIdx === -1) {
            data.movies.push({ id, title, poster_path, searchCount: 1 })
        } else {
            data.movies[movieIdx].searchCount += 1
        }

        data.movies.sort((a, b) => b.searchCount - a.searchCount)

        await writeToDB(data)

        // Although its better to do this in a GET, im GETting lazy
        res.status(200).send({ message: `Increased search count for ${id}` })
    } catch (error) {
        console.error("Error: " + error)
    }
})

app.listen(8080, () => {
    console.log("Listening in at http://localhost:8080")
})