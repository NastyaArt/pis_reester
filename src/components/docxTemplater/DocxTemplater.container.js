import { connect } from 'react-redux';
import DocxTemplater from './DocxTemplater';

const mapStateToProps = state => {
    return {
        data: state.reester.convertData,
        header: state.reester.header
    }
};

export default connect(mapStateToProps)(DocxTemplater);