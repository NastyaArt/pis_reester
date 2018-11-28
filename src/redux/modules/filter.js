import { handleActions, createAction } from 'redux-actions';
import { fetchCurrencyRates } from './rates';
import moment from 'moment';

const CURRENCIES = ['USD', 'EUR', 'RUB'];

//- Actions
export const selectCurrency = createAction('CURRENCY_SELECT');
export const changeDate = createAction('DATE_CHANGE');
export const checkCurrency = createAction('CHECK_CURRENCY');

//- State
const initialState = {
    selectedCurrency: 'USD',
    selectedTableCurrencies: ['USD', 'EUR'],
    startDate: moment().subtract(6, 'days'),
    endDate: moment()
};

//- Epics
export const filterEpic = (action$, store) => {
    return action$.ofType('DATE_CHANGE')
        .map(action => {
            let rangeDates = {
                startDate: store.getState().filter.startDate,
                endDate: store.getState().filter.endDate,
                currencies: CURRENCIES
            }
            return fetchCurrencyRates(rangeDates);
        });
};

//- Reducers
export default handleActions({
    CURRENCY_SELECT: (state, action) => {
        return { ...state, selectedCurrency: action.payload };
    },
    DATE_CHANGE: (state, action) => {
        return { ...state, startDate: action.payload.startDate, endDate: action.payload.endDate };
    },
    CHECK_CURRENCY: (state, action) => {
        let currs = state.selectedTableCurrencies;
        currs.indexOf(action.payload) === -1 ? currs.push(action.payload) : currs = currs.filter(x => x !== action.payload);
        return { ...state, selectedTableCurrencies: currs };
    }
}, initialState);