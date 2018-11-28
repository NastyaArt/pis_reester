import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => {
    return {
        fetching: state.api.fetching,
        error: state.rates.error,
        currentTab: state.tabs_switcher.currentTab
    };
};

export default connect(mapStateToProps)(App);