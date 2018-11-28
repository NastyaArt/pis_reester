import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from './tabs/Tabs.container';
import Table from './table/Table.container';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <header className="header">
                    <h2>Система организации деятельности некоммерческой организации</h2>
                </header>
                <nav>
                    <Tabs />
                </nav>
                <article>
                    {this.renderContent()}
                </article>
            </div>
        );
    }

    renderContent() {
        switch (this.props.currentTab) {
            case "table":
                return (
                        <div className="table_container">
                            <Table />
                        </div>
                );

            default:
                return null;
        }
    }
}

App.propTypes = {
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default App;
