import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => {
    return {
        currentTab: state.tabs_switcher.currentTab
    };
};

export default connect(mapStateToProps)(App);