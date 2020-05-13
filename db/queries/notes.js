const db = require('../db')

const getAll = async () => {
	const notes = await db.any("SELECT * FROM notes")
	return notes;
}

const getAllDrafts = async () => {
	const drafts = await db.any("SELECT * FROM drafts")
	return drafts;
}

const getDraftById = async (id) => {
	const draft = await db.one("SELECT * FROM drafts WHERE id = $1", id)
	return draft;
}

const getDraftsBySessionId = async (session_id) => {
	const drafts = await db.any("SELECT * FROM drafts WHERE session_id = $1", session_id)
	return drafts;
}

const deleteDraftById = async (id) => {
	const draft = await db.one("DELETE FROM drafts WHERE id = $1 RETURNING *", id)
	return draft;
}

const saveNote = async (note) => {
	const newNoteQuery = `
		INSERT INTO notes(user_id, text)
			VALUES($/user_id/, $/text/)
			RETURNING *
	`
	const newNote = await db.one(newNoteQuery, note)
	return newNote;
}

const saveDraft = async (noteDraft) => {
	const newDraftQuery = `
		INSERT INTO drafts(session_id, text)
			VALUES($/session_id/, $/text/)
			RETURNING *
	`
	const newDraft = await db.one(newDraftQuery, noteDraft)
	return newDraft;
}

const getNotesByUserId = async (user_id) => {
	const notes = await db.any("SELECT * FROM notes WHERE user_id = $1", [user_id])
	return notes;
}

module.exports = {
	getAll,
	saveDraft,
	saveNote,
	getNotesByUserId,
	getAllDrafts,
	getDraftById,
	getDraftsBySessionId,
	deleteDraftById
}
