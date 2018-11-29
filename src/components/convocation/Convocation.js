import React, { Component } from 'react';
import './Convocation.css';
import ReactTable from "react-table";
import { Button, Input } from "reactstrap";
import uuidv1 from'uuid/v1';

class Convocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
            tableData: this.props.data,
            header: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                quests: [],
                tableData: nextProps.data,
                header: []
            })
        }
    }

    render() {
        if (!this.props.data || !this.props.header) {
            return null;
        } else {
            return (
                <div>
                    <div className="quests-container">
                        <h5>Add questions</h5>
                        {this.renderQuestsInputs()}
                        <Button color="primary" className="button-margin" onClick={this.addQuest}>Add</Button>
                    </div>
                    <div className="table-container">
                        <ReactTable
                            data={this.state.tableData}
                            columns={this.getColumns()}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </div>
                </div>
            )
        }
    }

    renderQuestsInputs = () => {
        let result = [];

        this.state.quests.forEach((elem) => {
            result.push(
                <div key={elem.id} className="quest-container">
                    <Input className="quest-input" key={elem.id} value={elem.name} onChange={this.onChangeQuestName(elem.id)}/>
                    <Button color="danger" onClick={this.delQuest(elem.id)}>Del</Button>
                </div>
            )
        })

        return result;
    }

    getColumns = () => {
        let columns = [
            {
                Header: "FIO",
                accessor: "FAMILY",
                Cell: this.renderEditable,
                maxWidth: 300
            },
            {
                Header: "Real",
                accessor: "REAL",
                Cell: this.renderEditable,
                maxWidth: 60
            },
        ];
        this.state.quests.forEach((elem) => {
            columns.push(
                {
                  Header: elem.name,
                  columns: [
                    {
                        Header: "Yes",
                        accessor: elem.id + "_yes",
                        Cell: this.renderEditable,
                        style: {
                            background: 'limegreen '
                        },
                        maxWidth: 50
                    },
                    {
                        Header: "No",
                        accessor: elem.id + "_no",
                        Cell: this.renderEditable,
                        style: {
                            background: 'orange'
                        },
                        maxWidth: 50
                    },
                    {
                        Header: "-",
                        accessor: elem.id + "_",
                        Cell: this.renderEditable,
                        style: {
                            background: 'gold'
                        },
                        maxWidth: 50
                    }
                  ]
                }
        )});
        return columns;
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.tableData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ tableData: data});
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.tableData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    addQuest = () => {
        let quests = this.state.quests;
        quests.push({
            id: uuidv1(),
            name: "Quest"
        })
        this.setState({quests: quests});
    }

    delQuest = (id) => (e) => {
        let quests = this.state.quests;
        quests = quests.filter((elem) => {
            if (elem.id === id){
                return false;
            }
            return true;
        })
        this.setState({quests: quests});
    }

    onChangeQuestName = (id) => (e) => {
        let quests = this.state.quests;
        quests = quests.map((elem) => {
            if (elem.id === id){
                elem.name = e.target.value;
            }
            return elem;
        })
        this.setState({quests: quests});
    }

    addQuestTableData = (id) => {
        let data = this.state.tableData;
        data = data.map((elem) => {
            elem[id + '_yes'] = "";
            elem[id + '_no'] = "";
            elem[id + '_'] = "";
            return elem;
        })
        this.setState({ tableData: data});
    }

    delQuestTableData = (id) => {
        let data = this.state.tableData;
        data = data.map((elem) => {
            delete elem[id + '_yes'];
            delete elem[id + '_no'];
            delete elem[id + '_'];
            return elem;
        })
        this.setState({ tableData: data});
    }
};

export default Convocation;