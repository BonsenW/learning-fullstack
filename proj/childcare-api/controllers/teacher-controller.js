import Teacher from '../models/teacher.js'
import dbManager from '../db.js'

export default {
    getKids: async (req, res) => {
        const teacherId = parseInt(req.params.teacherId)
        const db = await dbManager.loadDB();

        const teacher = db.teachers.find((teacher) => teacher.id === teacherId)

        res.status(200).send(teacher)
    },

    createTeacher: async (req, res) => {
        const newTeacher = new Teacher(
            req.body.name || "",
            req.body.kids || []
        )

        const db = await dbManager.loadDB()

        db.teachers.push(newTeacher)

        await dbManager.saveDB(db)

        res.status(201).send(db)
    },

    deleteTeacher: async (req, res) => {
        const teacherId = parseInt(req.body.id)
        const db = await dbManager.loadDB();

        db.teachers = db.teachers.filter((x) => x.id != teacherId)

        await dbManager.saveDB(db)

        res.status(200).send(db)
    },

    updateTeacher: async (req, res) => {
        const teacherId = parseInt(req.body.id)
        const newName = req.body.name

        const db = await dbManager.loadDB();
        const teacher = db.teachers.find((teacher) => teacher.id === teacherId)

        teacher.name = newName || teacher.name

        await dbManager.saveDB(db)

        res.status(200).send(teacher)
    }
}