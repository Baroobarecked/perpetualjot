import { csrfFetch } from "./csrf";

//actions
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';
const GET_NOTEBOOKS = 'notebooks/GET_NOTEBOOKS'
// const EDIT_NOTEBOOK = 'notebooks/EDIT_NOTEBOOK';
const DELETE_NOTEBOOK = 'notebooks/DELETE_NOTEBOOK';
//action creators
const addNotebook = (notebook) => ({
    type: ADD_NOTEBOOK,
    notebook,
});

// const editNotebook = (notebook) => ({
//     type: EDIT_NOTEBOOK,
//     notebook,
// });

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

    if(newNotebook) {
        const result = await dispatch(addNotebook(newNotebook));
        return result;
    };

};

export const editNotebook = notebook => async (dispatch) => {
    const { title, notebookId } = notebook;

    const res = await csrfFetch(`/api/notebooks`, {
        method: 'PUT',
        body: JSON.stringify({
            notebookId,
            title,
        })
    });

    const updatedNotebook = await res.json();
    console.log(updatedNotebook)

    if(updatedNotebook) {
        const result = await dispatch(addNotebook(updatedNotebook));
        return result;
    };

};

export const deleteOldNotebook = (notebookId) => async dispatch => {

};

export const getNotebookArray = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks`);

    const notebooksArray = await res.json();

    const result = await dispatch(getNotebooks(notebooksArray));
    return result;
};

const notebookReducer = (state = null, action) => {
    let newState = {};
    switch (action.type) {
        case GET_NOTEBOOKS:
            action.notebooks.forEach(notebook => {
                const key = notebook.id;
                newState[key] = notebook;
            })
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