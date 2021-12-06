import { csrfFetch } from "./csrf";

//actions
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';
const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'
// const EDIT_NOTE = 'notes/EDIT_NOTE';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';
//action creators
const addNotebook = (notebook) => ({
    type: ADD_NOTEBOOK,
    notebook,
});

const getNotebooks = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks
});

const deleteNotebook = (notebookId) => ({
    type: DELETE_NOTEBOOK,
    notebookId,
});
//thunks
export const addNewNotebook = notebook => async (dispatch) => {
    const { title, userId } = notebook;

    const res = await csrfFetch(`/api/notebooks`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            userId
        })
    });

    const newNotebook = await res.json();
    console.log(newNotebook)

    if(newNotebook) {
        const result = await dispatch(addNotebook(newNotebook));
        return result;
    }

}

export const getNotebookArray = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks`);

    const notebooksArray = await res.json();

    const result = await dispatch(getNotebooks(notebooksArray));
    return result;
}

const notebookReducer = (state = null, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS:
            let newState = {};
            newState = { ...state, ...action.notebooks};
            return newState;
        case ADD_NOTEBOOK:
            const key = action.notebook.id;
            newState[key] = action.notebook;
            newState = { ...state, ...newState };
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;