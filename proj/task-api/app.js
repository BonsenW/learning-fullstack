import express from 'express';
import Task from './models/task.js'

const app = express()
let db = []

app.use(express.json());

app.set('port', 8080)

app.use((req, res, next) => {
    console.log("----- REQUEST LOG -----");
    console.log("Method:", req.method);
    console.log("URL:", req.baseUrl + req.path);
    console.log("Body:", req.body);
    console.log("------------------------");

    next()
})

app.get('/', (req, res) => {
    res.send(db)
})

app.post('/', (req, res) => {
    try {
        const task = new Task(
            req.body.title,
            req.body.description
        )

        db.push(task)

        res.status(200).send({
            status: "OK",
            message: "New task added",
            task
        });
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/:id', (req, res) => {
    try {
        const delId = parseInt(req.params.id)

        db = db.filter(x => x.id != delId)

        res.status(200).send({
            status: "OK",
            message: `Task ${delId} deleted`
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.put('/', (req, res) => {
    const id = db.findIndex(x => x.id === req.body.id)

    db[id].title = req.body.title || db[id].title;
    db[id].description = req.body.description || db[id].description;

    res.status(200).send({
        status: "OK",
        message: `Task ${id} updated`,
        task: db[id]
    })

})

app.listen(app.get('port'), () => console.log("Listening in at http://localhost:8080"))