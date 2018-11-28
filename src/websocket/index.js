import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {API_HOST} from '../api/CurrencyRatesApi';

const RECONNECT_INTERVAL = 1000;
const ATTEMPTS_LIMIT = 5;
const ATTEMPTS_RESET_TIME = 5 * 1000; // 5 sec

class WebSocketService {
    constructor() {
        this.socket = null;
        this.id = null;
        this.connectionStatus = new BehaviorSubject({ isConnected: false });
        this.messages = new Subject();
        this.attempts = 0;
    }

    connect(id) {
        if (this.socket == null) {
            this.id = id;
            this.connectionStatus.next({ isConnected: false, isReconnecting: true });

            this.socket = new WebSocket(`ws://${API_HOST}/${id}`);
            this.socket.onopen = this.handleConnectionOpen;
            this.socket.onclose = this.handleConnectionClose;
            this.socket.onmessage = this.dispatchMessageToSubscriber;
            this.socket.onerror = this.handleConnectionError;
        } else {
            this.reconnect();
        }
        return this;
    }

    reconnect() {
        this.socket = null;
        return this.connect(this.id);
    }

    close() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.connectionStatus.next({ isConnected: false });
    }

    handleConnectionOpen = () => {
        setTimeout(() => this.attempts = 0, ATTEMPTS_RESET_TIME);
        this.connectionStatus.next({ isConnected: true });
    };

    dispatchMessageToSubscriber = (event) => {
        this.messages.next(JSON.parse(event.data));
    };

    handleConnectionClose = (event) => {
        if (this.socket === null) {
            // Connection closed from client
            return;
        }

        let connectionStatus = {
            isConnected: false,
            stopServerCode: event.code,
            stopServerReason: event.reason
        };

        if (this.attempts < ATTEMPTS_LIMIT) {
            // Connection closed abnormally, reconnect
            connectionStatus.isReconnecting = true;
            this.attempts++;
            setTimeout(this.reconnect.bind(this), RECONNECT_INTERVAL);

        } else {
            // Connection closed abnormally and attempts limit reached
            connectionStatus.stopServerReason = 'Connection was lost and failed to be recovered after ' + this.attempts + ' attempts. Try reconnect later.';
        }

        this.connectionStatus.next(connectionStatus);
    };

    handleConnectionError = () => {
        console.log('Socket error occurred.');
    };
}

export default WebSocketService;