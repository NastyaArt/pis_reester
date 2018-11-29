import { combineReducers } from 'redux';
import tabs_switcher from './tabs_switcher';
import reester from './reester';

export const rootReducer = combineReducers({
    tabs_switcher,
    reester
});
