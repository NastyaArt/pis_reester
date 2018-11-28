import { connect } from 'react-redux';
import Table from './Table';
import { setCovertData, setHeaderData, cleanData } from './../../redux/modules/reester';

const mapStateToProps = state => {
    return {
        convertData: state.reester.convertData,
        header: state.reester.header
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetConvertData: (data) => {
            dispatch(setCovertData(data));
        },
        onSetHeaderData: (data) => {
            dispatch(setHeaderData(data));
        },
        onCleanData: () => {
            dispatch(cleanData());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);