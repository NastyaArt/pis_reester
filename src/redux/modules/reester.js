import {createAction, handleActions} from 'redux-actions';

//- Actions
export const setCovertData = createAction('SET_CONVERT_DATA');
export const setHeaderData = createAction('SET_HEADER_DATA');
export const cleanData = createAction('CLEAN_DATA');

//- State
const initialState = {
    convertData: null,
    header: null
};

//- Reducers
export default handleActions({
    SET_CONVERT_DATA: (state, action) => {
        return {...state, convertData: action.payload};
    },
    SET_HEADER_DATA: (state, action) => {
        return {...state, header: action.payload};
    },
    CLEAN_DATA: (state, action) => {
        return initialState;
    }
}, initialState);
