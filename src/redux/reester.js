import {createAction, handleActions} from 'redux-actions';

//- Actions
export const setConvertData = createAction('SET_CONVERT_DATA');
export const setHeaderData = createAction('SET_HEADER_DATA');
export const cleanData = createAction('CLEAN_DATA');
export const addDataItem = createAction('ADD_DATA_ITEM');
export const delDataItem = createAction('DEL_DATA_ITEM');

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
    },
    ADD_DATA_ITEM: (state, action) => {
        let item = action.payload;
        let data = [...state.convertData];

        data.push(item);

        return {...state, convertData: data};
    },
    DEL_DATA_ITEM: (state, action) => {
        let index = action.payload;
        let data = [...state.convertData];

        data.splice( index, 1 );

        return {...state, convertData: data};
    },
}, initialState);
