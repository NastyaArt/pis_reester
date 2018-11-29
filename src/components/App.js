import React, { Component } from 'react';
import Tabs from './tabs/Tabs.container';
import Table from './table/Table.container';
import DocxTemplater from './docxTemplater/DocxTemplater.container';
import Convocation from './convocation/Convocation.container';

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

            case "template":
                return (
                        <div className="template_container">
                            <DocxTemplater />
                        </div>
                );

            case "convocation":
                return (
                        <div className="convocation_container">
                            <Convocation />
                        </div>
                );

            default:
                return null;
        }
    }
}

export default App;
