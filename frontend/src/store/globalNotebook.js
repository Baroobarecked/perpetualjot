//actions
const ADD_GLOBALNOTEBOOK = 'globalNotebook/ADD_GLOBALNOTEBOOK';
const RESET_GLOBALNOTEBOOK = 'globalNotebook/RESET_GLOBALNOTEBOOK';


//action creators
const addGlobalNotebook = (note) => ({
    type: ADD_GLOBALNOTEBOOK,
    note,
});

const resetGlobalNotebook = () => ({
    type: RESET_GLOBALNOTEBOOK,
});

//thunks
export const setNewGlobalNotebook = note => async (dispatch) => {

    const newGlobalNotebook = {...note}

    if(newGlobalNotebook) {
        const result = await dispatch(addGlobalNotebook(newGlobalNotebook));
        return result;
    };

};

export const initResetGlobalNotebook = () => async dispatch => {
    dispatch(resetGlobalNotebook());
};

const globalNotebookReducer = (state = null, action) => {
    let newState = {};
    switch (action.type) {
        case ADD_GLOBALNOTEBOOK:
            newState = action.note;
            return newState;
        case RESET_GLOBALNOTEBOOK:
            newState = null;
            return newState;
        default:
            return state;
    }
}

export default globalNotebookReducer;