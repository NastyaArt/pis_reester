import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import api from './api';
import ws from './ws';
import rates, { ratesEpic } from './rates';
import filter, { filterEpic } from './filter';
import progress from './progress';
import tabs_switcher from './tabs_switcher';
import reester from './reester';

export const rootReducer = combineReducers({
    api,
    ws,
    rates,
    filter,
    progress,
    tabs_switcher,
    reester
});

export const rootEpic = combineEpics(
    ratesEpic,
    filterEpic
);