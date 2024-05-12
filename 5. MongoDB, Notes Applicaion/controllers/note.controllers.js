import Note from "../models/note.models.js";
import asyncHandler from "express-async-handler";

/**
 * This method creates a note
 * @method POST
 * @param {string} title - note's title
 * @param {string} content - note's content
 */
const createNote = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

    if (title && content) {
      const newNote = new Note({
        title: title,
        content: content,
      });

      const createdNote = await newNote.save();

      res.json({
        code: 200,
        remark: "note created",
      });
    } else {
      res.status(400);
      res.json({
        code: 400,
        remark: "title or content missing",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "failed",
    });
  }
});

/**
 * This method returns note records
 * @method GET
 * @query {string} search - note's title (optional)
 * @query {isArchived} search - if not is archived or not (optional)
 */
const getNotes = asyncHandler(async (req, res) => {
  try {

    let filterObject = {
      isArchived: req.query.isArchived === undefined ? false: req.query.isArchived
    }

    if(req.query.search){
      filterObject.title = {
        $regex: req.query.search,
        $options: "i"
      }
    }

    const notes = await Note.find(filterObject);

    res.json({
      code: 200,
      remark: "success",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "failed",
    });
  }
});

/**
 * This method updates a note
 * @method PUT
 * @param {string} title - note's title (optional)
 * @param {string} content - note's content (optional)
 */
const updateNote = asyncHandler(async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const note = await Note.findById(noteId);

    if (note) {
      const { title, content, archivedToggle } = req.body;

      note.title = title || note.title;
      note.content = content || note.content;
      note.isArchived = archivedToggle === undefined ? note.isArchived : archivedToggle;

      await note.save();

      res.json({
        code: 200,
        remarl: "note updated",
      });
    } else {
      console.log(error);
      res.status(404);
      res.json({
        code: 404,
        remark: "Note not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "failed",
    });
  }
});

/**
 * This method deletes a particular note
 * @method DELETE
 */
const deleteNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);

    res.json({
      code: 200,
      remark: "note deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      code: 500,
      remark: "Something went wrong",
    });
  }
});

export { createNote, getNotes, updateNote, deleteNote };
