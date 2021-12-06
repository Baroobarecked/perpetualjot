import { csrfFetch } from "./csrf";

const notebookReducer = (state = { notebooks: null }, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default notebookReducer;