//actions
const ADD_GLOBALNOTE = 'globalNote/ADD_GLOBALNOTE';
const RESET_GLOBALNOTE = 'globalNote/RESET_GLOBALNOTE';


//action creators
const addGlobalNote = (note) => ({
    type: ADD_GLOBALNOTE,
    note,
});

const resetGlobalNote = () => ({
    type: RESET_GLOBALNOTE,
});

//thunks
export const setNewGlobalNote = note => async (dispatch) => {

    const newGlobalNote = {...note}

    if(newGlobalNote) {
        const result = await dispatch(addGlobalNote(newGlobalNote));
        return result;
    };

};

export const initResetGlobalNote = () => async dispatch => {
    dispatch(resetGlobalNote());
};

const globalNoteReducer = (state = null, action) => {
    let newState = {};
    switch (action.type) {
        case ADD_GLOBALNOTE:
            newState = action.note
            return newState;
        case RESET_GLOBALNOTE:
            newState = null;
            return newState;
        default:
            return state;
    }
}

export default globalNoteReducer;