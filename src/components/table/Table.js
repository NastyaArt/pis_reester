import React, { Component } from 'react';
import './Table.css';
import CSVReader from "react-csv-reader";
import { CSVLink } from "react-csv";
import ReactTable from "react-table";
import { Button } from "reactstrap";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            convertData: null,
            header: null
        };
    }
    render() {
        if (!this.state.convertData || !this.state.header) {
            return (
                <div className='csv-container'>
                    <CSVReader
                        cssClass="csv-input"
                        label="Select CSV file"
                        onFileLoaded={this.handleForce}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <div className="menu-container">
                        <CSVLink data={this.state.convertData} filename={"reester.csv"} className="btn btn-primary">Download csv</CSVLink>
                        <Button></Button>
                    </div>
                    <div>
                        <ReactTable
                            data={this.state.convertData}
                            columns={this.getColumns()}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </div>
                </div>
            )
        }
    }

    getColumns = () => {
        let columns = [];
        this.state.header.forEach((elem) => {
            columns.push({
                Header: elem,
                accessor: elem,
                Cell: this.renderEditable
            })
        })
        return columns;
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.convertData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ convertData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.convertData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    handleForce = (data) => {
        let header = data[0];
        data.shift();
        let convertData = [];
        data.forEach((elem) => {
            let obj = {}
            elem.forEach((value, id) => {
                obj[header[id]] = value;
            })
            convertData.push(obj);
        })
        this.setState({ convertData: convertData, header: header });
    }

};

export default Table;