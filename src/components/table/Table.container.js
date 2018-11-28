import { connect } from 'react-redux';
import Table from './Table';
const mapStateToProps = state => {
    let selectedCurrencies = [...state.filter.selectedTableCurrencies]
    if (state.rates.ticks) {
        let rates = [...state.rates.ticks];
        return {
            selectedCurrencies,
            rates
        };
    } else {
        return {
            selectedCurrencies,
        };
    }
};


export default connect(mapStateToProps)(Table);