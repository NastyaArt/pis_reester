import { handleActions, createAction } from 'redux-actions';
import { updateApiFetching } from './api';
import { CurrencyRatesApi } from '../../api/CurrencyRatesApi'
import Rx from 'rxjs/Rx';

const IDENTIFIERS = {
    145: 'USD',
    292: 'EUR',
    298: 'RUB'
};

//- Actions
export const fetchCurrencyRates = createAction('FETCH_CURRENCY_RATES');
export const fetchCurrencyRatesFailed = createAction('FETCH_CURRENCY_RATES_FAILED');
export const fetchCurrencyRatesSuccess = createAction('FETCH_CURRENCY_RATES_SUCCESS');

//- State
const initialState = {
    ticks: null,
    error: null
};

//- Epics
export const ratesEpic = action$ => {
    return action$.ofType('FETCH_CURRENCY_RATES')
        .switchMap(action => {
            return Rx.Observable.merge(
                Rx.Observable.of(updateApiFetching(true)), // show spinner
                Rx.Observable.of(CurrencyRatesApi.fetchCurrencyRatesAll(action.payload)) // do group of requests to the server
                    .mergeMap(data => {
                        return Rx.Observable.forkJoin(data.map(response => {
                            return Rx.Observable.fromPromise(response).mergeMap(response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText); // error handling
                                }
                                let responseType = response.headers.get('Content-Type');
                                if (responseType.startsWith('application/json')) {
                                    return Rx.Observable.fromPromise(response.json()); // try to use Promise.reject('Cannot convert to json') here instead of response.json() to insure we catch this rejection
                                } else {
                                    throw new Error('Invalid data format'); // custom error in case we got not json data
                                }
                            })
                        }))
                    })
                    .mergeMap(data => Rx.Observable.of(fetchCurrencyRatesSuccess(data), updateApiFetching(false))) // hide spinner and redraw chart
                    .catch(error => {
                        return Rx.Observable.of(
                            updateApiFetching(false),  // hide spinner
                            fetchCurrencyRatesFailed(error.toString())  // show error
                        )
                    })
            )
        });
};

//- Reducers
export default handleActions({
    FETCH_CURRENCY_RATES: (state, action) => {
        return { ...state, ticks: null, error: null };  // if we will comment it in, we will see chart during refreshing rates (also shows that we always go through reducer (even with epics))
    },
    FETCH_CURRENCY_RATES_FAILED: (state, action) => {
        return { ...state, error: action.payload, ticks: null };
    },
    FETCH_CURRENCY_RATES_SUCCESS: (state, action) => {
        const data = [];
        action.payload.map(obj => (obj.map((el, i) => {
            data[i] = data[i] || {};
            data[i].Date = data[i].Date || el.Date.split('T')[0]; // "2017-01-01T00:00:00" => ["2017-01-01", "00:00:00"] => "2017-01-01"
            data[i][IDENTIFIERS[el.Cur_ID]] = el.Cur_OfficialRate;
            return el;
        })));
        return { ...state, ticks: data, error: null }; // need to set error to null in case we get success result after fails
    },
}, initialState);