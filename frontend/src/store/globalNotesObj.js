const ADD_GLOBALNOTES = 'globalNote/ADD_GLOBALNOTES';
const EDIT_GLOBALNOTES = 'globalNote/EDIT_GLOBALNOTES';
const DELETE_GLOBALNOTES = 'globalNote/DELETE_GLOBALNOTES';

//action creators
const addGlobalNotes = (notes) => ({
    type: ADD_GLOBALNOTES,
    notes,
});
const changeGlobalNotes = (note) => ({
    type: EDIT_GLOBALNOTES,
    note,
});
const removeGlobalNote = (note) => ({
    type: DELETE_GLOBALNOTES,
    note,
});

//thunks
export const setGlobalNotes = (notes) => async (dispatch) => {
    const result = await dispatch(addGlobalNotes(notes.notes));
    return result;
};
export const editGlobalNotes = (note) => async (dispatch) => {
    const result = await dispatch(changeGlobalNotes(note));
    return result;
};
export const editGlobalNotesArray = (noteArray) => async (dispatch) => {
    noteArray.notes.forEach(async note => {
        await dispatch(removeGlobalNote(note));
    })
};
export const deleteGlobalNotes = (note) => async (dispatch) => {
    const result = await dispatch(removeGlobalNote(note));
    return result;
};

const globalNotesObjReducer = (state = null, action) => {
    let newState = {};
    let arrayNotes = [];
    switch (action.type) {
        case ADD_GLOBALNOTES:
            newState = {notes: action.notes}
            return newState;
        case EDIT_GLOBALNOTES:
            newState = {...state}
            arrayNotes = newState.notes;
            const index = arrayNotes.findIndex(note => note.id === action.note.id);
            if(index !== -1) {
                arrayNotes[index] = action.note;
            } else {
                arrayNotes.push(action.note)
            };
            newState = {notes: [...arrayNotes]};
            return newState;
        case DELETE_GLOBALNOTES:
            newState = {...state}
            arrayNotes = newState.notes;
            const deleteIndex = arrayNotes.findIndex(note => note.id === action.note.id);
            arrayNotes.splice(deleteIndex, 1)
            newState = {notes: [...arrayNotes]};
            return newState
        default:
            return state;
    }
}

export default globalNotesObjReducer;