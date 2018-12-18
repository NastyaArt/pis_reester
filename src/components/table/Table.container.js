import { connect } from 'react-redux';
import Table from './Table';
import { setConvertData, setHeaderData, cleanData, addDataItem, delDataItem } from '../../redux/reester';

const mapStateToProps = state => {
    return {
        convertData: state.reester.convertData,
        header: state.reester.header
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetConvertData: (data) => {
            dispatch(setConvertData(data));
        },
        onSetHeaderData: (data) => {
            dispatch(setHeaderData(data));
        },
        onCleanData: () => {
            dispatch(cleanData());
        },
        onAddItem: (item) => {
            dispatch(addDataItem(item));
        },
        onDelItem: (index) => {
            dispatch(delDataItem(index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);