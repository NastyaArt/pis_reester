import {createAction, handleActions} from 'redux-actions';

//- Actions
export const updateApiFetching = createAction('API_FETCHING_UPDATE');

//- State
const initialState = {
    fetching: false
};

//- Reducers
export default handleActions({
    API_FETCHING_UPDATE: (state, action) => {
        return {fetching: action.payload};
    }
}, initialState);

