import express from 'express'
import teacherController from '../controllers/teacher-controller.js'

const router = express.Router()

router.get('/:teacherId', teacherController.getKids)

router.post('/', teacherController.createTeacher)

router.delete('/', teacherController.deleteTeacher)

router.put('/', teacherController.updateTeacher)

export default router