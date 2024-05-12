import express from "express"
import {createNote, getNotes, updateNote, deleteNote} from "../controllers/note.controllers.js"

const router = express.Router()

router.route('/').post(createNote).get(getNotes)
router.route('/:noteId').put(updateNote).delete(deleteNote)

export default router