import React, { Component } from 'react';
import './Table.css';
import CSVReader from "react-csv-reader";
import { CSVLink } from "react-csv";
import ReactTable from "react-table";
import { Button } from "reactstrap";

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import saveAs from 'file-saver';
import JSZipUtils from 'jszip-utils';

class Table extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     convertData: null,
        //     header: null
        // };
    }
    render() {
        if (!this.props.convertData || !this.props.header) {
            return (
                <div className='csv-container'>
                    {/* <input type="file" id="file" name="file" multiple onChange={this.fileChange}/> */}
                    <Button onClick={this.createTemplate}>Create template</Button>
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

    createTemplate = () => {
        JSZipUtils.getBinaryContent('./input.docx', (error, content) => {
            if (error) { throw error };
            var zip = new JSZip(content);
            var doc = new Docxtemplater().loadZip(zip);
            doc.setData({
                first_name: 'John',
                last_name: 'Doe',
                phone: '0652455478',
                description: 'New Website'
            });
            try {
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({error: e}));
                throw error;
            }
            var out=doc.getZip().generate({
                type:"blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            })
            saveAs(out,"output.docx");
        });
    }

    cleanState = () => {
        this.props.onCleanData();
    }
    
};

export default Table;