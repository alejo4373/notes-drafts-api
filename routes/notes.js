const express = require('express');
const router = express.Router();
const notesQueries = require('../db/queries/notes')
const { loginRequired } = require('../auth/helpers')

router.get('/', loginRequired, async (req, res, next) => {
  try {
    let notes = await notesQueries.getAll()
    res.json({
      payload: notes,
      msg: "Retrieved all notes",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed retrieving notes",
      err: true
    })
  }
});

router.post('/', loginRequired, async (req, res, next) => {
  let note = {
    user_id: req.user.id,
    ...req.body
  }

  try {
    let newNote = await notesQueries.saveNote(note)
    res.json({
      payload: newNote,
      msg: "Added new note",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed to add new note",
      err: true
    })
  }
});

router.post('/drafts/:draft_id/commit', loginRequired, async (req, res, next) => {
  const { draft_id } = req.params

  try {
    let noteDraft = await notesQueries.getDraftById(draft_id)

    if (noteDraft.session_id !== req.session.id) {
      return res.status(401).json({
        payload: null,
        msg: "Forbidden. Draft does not belong to your session or draft was created in a session other than the current session.",
        err: true
      })
    }

    let note = {
      user_id: req.user.id,
      text: noteDraft.text
    }

    let newNote = await notesQueries.saveNote(note)
    res.json({
      payload: newNote,
      msg: "Committed/saved new note",
      err: false
    })

    await notesQueries.deleteDraftById(draft_id)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed to commit/save new note",
      err: true
    })
  }
});

router.post('/drafts', async (req, res, next) => {
  console.log('session id:', req.session.id)
  let note = {
    session_id: req.session.id,
    text: req.body.text
  }

  try {
    let noteDraft = await notesQueries.saveDraft(note)
    res.json({
      payload: noteDraft,
      msg: "Saved new note draft",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed to save note draft",
      err: true
    })
  }
});


router.get('/drafts', async (req, res, next) => {
  const session_id = req.session.id
  try {
    console.log('session id:', req.session.id)
    let drafts = await notesQueries.getDraftsBySessionId(session_id)
    res.json({
      payload: drafts,
      msg: "Retrieved all drafts, for current session.",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failed retrieving drafts",
      err: true
    })
  }
});

module.exports = router;
