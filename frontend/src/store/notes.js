import { csrfFetch } from "./csrf";
//actions
const ADD_NOTE = 'notes/ADD_NOTE';
// const EDIT_NOTE = 'notes/EDIT_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';
//action creators
const addNote = (note) => ({
    type: ADD_NOTE,
    note,
});

// const editNote = (note) => ({
//     type: EDIT_NOTE,
//     noteId,
// });

const deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    noteId,
});
//thunks
const addNewNote = note => async (dispatch) => {
    const { title, content } = note;

    const res = csrfFetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
        })
    });

    const newNote = await res.json();
    console.log(newNote);

    if(newNote) {
        const result = await dispatch(addNote(newNote));
        return result;
    }

};

const noteReducer = (state = { notes: null }, action) => {
    switch (action.type) {
        case ADD_NOTE:
            const newState = {
                ...state,
                notes: action.note
            };
            return newState;
        default:
            return state;
    }
}

export default noteReducer;