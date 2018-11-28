import {connect} from 'react-redux';
import {selectCurrency} from '../../../redux/modules/filter';
import DropUp from './DropUp';

const currencies = ['USD', 'EUR', 'RUB'];

const mapStateToProps = state => {
    return {
        options: currencies,
        selectedOption: state.filter.selectedCurrency
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelect: (currency) => {
            dispatch(selectCurrency(currency));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropUp);