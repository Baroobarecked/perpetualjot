import { csrfFetch } from "./csrf";

//actions
const ADD_NOTE = 'notes/ADD_NOTE';
const GET_NOTES = 'notes/GET_NOTES'
// const EDIT_NOTE = 'notes/EDIT_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

//action creators
const addNote = (note) => ({
    type: ADD_NOTE,
    note,
});

// const editNote = (note) => ({
//     type: EDIT_NOTE,
//     note,
// });

const getNotes = (notes) => ({
    type: GET_NOTES,
    notes
});

const deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    noteId,
});

//thunks
export const addNewNote = note => async (dispatch) => {
    const { title, userId, notebookId, content } = note;

    const res = await csrfFetch(`/api/notes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            userId,
            notebookId,
            content,
        })
    });

    const newNote = await res.json();

    if(newNote) {
        const result = await dispatch(addNote(newNote));
        return result;
    };

};

export const editNote = note => async (dispatch) => {
    const { title, noteId, content } = note;

    const res = await csrfFetch(`/api/notes`, {
        method: 'PUT',
        body: JSON.stringify({
            noteId,
            title,
            content,
        })
    });

    const updatedNote = await res.json();
    console.log(updatedNote)

    if(updatedNote) {
        const result = await dispatch(addNote(updatedNote));
        return result;
    };

};

export const deleteOldNote = (noteId) => async dispatch => {
    await csrfFetch('/api/notes', {
        method: 'DELETE',
        body: JSON.stringify(noteId),
    });
    console.log(noteId)
    await dispatch(deleteNote(noteId));
};

export const getNoteArray = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notes`);

    const notesArray = await res.json();

    const result = await dispatch(getNotes(notesArray));
    return result;
};

const noteReducer = (state = null, action) => {
    let newState = {};
    switch (action.type) {
        case GET_NOTES:
            action.notes.forEach(note => {
                const key = note.id;
                newState[key] = note;
            })
            return newState;
        case ADD_NOTE:
            const key = action.note.id;
            newState[key] = action.note;
            newState = { ...state, ...newState };
            return newState;
        case DELETE_NOTE:
            const deletekey = action.noteId.noteId;
            newState = { ...state };
            delete newState[deletekey];
            return newState;
        default:
            return state;
    }
}

export default noteReducer;