import {createAction, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';
import uuid from 'uuid/v4';
import WebSocketService from '../../websocket';

export const CLIENT_ID = uuid();
export const service = new WebSocketService();

export const connect = ({dispatch}) => {
    service.connectionStatus.subscribe((status) => {
        dispatch(updateWsConnected(status));
    });

    service.messages.subscribe((message) => {
        dispatch({
            type: 'WS_MESSAGE_' + message.type.toUpperCase() + '_HANDLE',
            payload: message.payload
        });
    });

    service.connect(CLIENT_ID);
};

//- Actions
const updateWsConnected = createAction('WS_CONNECTED_UPDATE');

//- State
const initialState = {
    status: {
        isConnected: false,
        isReconnecting: false,
        stopServerCode: null,
        stopServerReason: null
    }
};

//- Reducers
export default handleActions({
    WS_CONNECTED_UPDATE: (state, action) => {
        return {status: action.payload};
    }
}, initialState);

//- Selectors
export const getWsStatus = (state) => state.ws.status;

export const getWsStatusString = createSelector(
    getWsStatus,
    status => status.isConnected ? 'connected' : (status.isReconnecting ? 'reconnecting' : 'disconnected')
);