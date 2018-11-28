import { connect } from 'react-redux';
import { CLIENT_ID } from '../../../redux/modules/ws';

import ExportButton from './ExportButton';
import { API_HOST } from '../../../api/CurrencyRatesApi';

const mapStateToProps = state => {
    let startDate = state.filter.startDate.toISOString();
    let endDate = state.filter.endDate.toISOString();
    let tab = state.tabs_switcher.currentTab;
    let currencies = [];
    switch (tab) {
        case 'chart':
            currencies = 'currency=' + state.filter.selectedCurrency + '&';
            break;
        case 'table':
            currencies = [...state.filter.selectedTableCurrencies];
            currencies = currencies.reduce((total, cur) => total += `currency=${cur}&`, "");
            break;
        default:
            break;
    }

    return {
        uri: `http://${API_HOST}/api/csv?${currencies}dateFrom=${startDate}&dateTo=${endDate}&clientId=${CLIENT_ID}`
    }
};

export default connect(mapStateToProps)(ExportButton);