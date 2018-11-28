import { connect } from 'react-redux';
import { changeTab } from '../../redux/modules/tabs_switcher';
import Tabs from './Tabs';

const mapStateToProps = state => {
    return {
        currentTab: state.tabs_switcher.currentTab,
        tabsInfo: [
            { id: "table", name: "Table" },
            { id: "template", name: "Docx templater" },
            { id: "convocation", name: "Сonvocation" }
        ]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTabChange: (tab) => {
            dispatch(changeTab(tab));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);