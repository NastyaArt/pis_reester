import { connect } from 'react-redux';
import Convocation from './Convocation';

const mapStateToProps = state => {
    return {
        data: state.reester.convertData,
        header: state.reester.header
    }
};

export default connect(mapStateToProps)(Convocation);