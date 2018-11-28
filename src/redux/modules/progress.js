import {createAction, handleActions} from 'redux-actions';

//- Actions
export const resetProgress = createAction('PROGRESS_RESET');

//- State
const initialState = {
    total: null,
    done: null
};

//- Reducers
export default handleActions({

    WS_MESSAGE_PROGRESS_HANDLE: (state, action) => {
        return action.payload;
    },

    PROGRESS_RESET: () => {
        return initialState;
    }

}, initialState);

