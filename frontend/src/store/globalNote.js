import { csrfFetch } from "./csrf";

//actions
const ADD_GLOBALNOTE = 'globalNote/ADD_GLOBALNOTE';


//action creators
const addGlobalNote = (note) => ({
    type: ADD_GLOBALNOTE,
    note,
});

//thunks
export const setNewGlobalNote = note => async (dispatch) => {

    const newGlobalNote = {...note}

    if(newGlobalNote) {
        const result = await dispatch(addGlobalNote(newGlobalNote));
        return result;
    };

};

const globalNoteReducer = (state = null, action) => {
    let newState = {};
    switch (action.type) {
        case ADD_GLOBALNOTE:
            newState = action.note
            return newState;
        default:
            return state;
    }
}

export default globalNoteReducer;