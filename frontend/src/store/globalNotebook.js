//actions
const ADD_GLOBALNOTEBOOK = 'globalNotebook/ADD_GLOBALNOTEBOOK';


//action creators
const addGlobalNotebook = (note) => ({
    type: ADD_GLOBALNOTEBOOK,
    note,
});

//thunks
export const setNewGlobalNotebook = note => async (dispatch) => {

    const newGlobalNotebook = {...note}

    if(newGlobalNotebook) {
        const result = await dispatch(addGlobalNotebook(newGlobalNotebook));
        return result;
    };

};

const globalNotebookReducer = (state = null, action) => {
    let newState = {};
    switch (action.type) {
        case ADD_GLOBALNOTEBOOK:
            newState = action.note
            return newState;
        default:
            return state;
    }
}

export default globalNotebookReducer;