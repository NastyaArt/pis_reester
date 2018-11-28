import React, { Component } from 'react';
import './Table.css';
import CSVReader from "react-csv-reader";
import { CSVLink } from "react-csv";
import ReactTable from "react-table";
import { Button } from "reactstrap";

class Table extends Component {
    render() {
        if (!this.props.convertData || !this.props.header) {
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
                        <CSVLink data={this.props.convertData} filename={"reester.csv"} className="btn btn-primary">Download csv</CSVLink>
                        <Button onClick={this.cleanState}>Close file</Button>
                    </div>
                    <div className="table-container">
                        <ReactTable
                            data={this.props.convertData}
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
        this.props.header.forEach((elem) => {
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
                    const data = [...this.props.convertData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.props.onSetConvertData(data);
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.convertData[cellInfo.index][cellInfo.column.id]
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
        this.props.onSetConvertData(convertData);
        this.props.onSetHeaderData(header);
    }

    cleanState = () => {
        this.props.onCleanData();
    }
    
};

export default Table;