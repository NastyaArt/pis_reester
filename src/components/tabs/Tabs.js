import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tabs.css';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.currentTab,
            tabsInfo: props.tabsInfo
        };
        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(e) {
        this.props.onTabChange(e.target.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentTab: nextProps.currentTab
        });
    }

    getTabs() {
        return this.state.tabsInfo.map(tab =>
            <div key={tab.id}
                className={`tab ${tab.id === this.state.currentTab ? "active" : ""}`}
                id={tab.id}
                onClick={this.onTabChange}
            >
                {tab.name}
            </div>
        )
    }

    render() {
        return (
            <div className='tabs'>
                {this.getTabs()}
            </div>
        );
    }

};

Tabs.propTypes = {
    currentTab: PropTypes.string.isRequired,
    tabsInfo: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
};

export default Tabs;