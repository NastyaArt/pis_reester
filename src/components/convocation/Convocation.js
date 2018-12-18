import React, { Component } from 'react';
import './Convocation.css';
import ReactTable from "react-table";
import { Button, Input } from "reactstrap";
import uuidv1 from'uuid/v1';
import { CSVLink } from "react-csv";

class Convocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: [],
            tableData: this.props.data ? this.props.data.map((elem) => {
                return {
                    "FAMILY": elem.FAMILY,
                    "REAL": elem.REAL
                }
            }) : [],
            header: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                quests: [],
                tableData: nextProps.data.map((elem) => {
                    return {
                        "FAMILY": elem.FAMILY,
                        "REAL": elem.REAL
                    }
                }),
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
                        <CSVLink data={this.getCSVData()} filename={"reester.csv"} className="btn btn-primary">Скачать csv</CSVLink>
                    </div>
                    <div className="quests-container">
                        <h5>Добавить вопрос</h5>
                        {this.renderQuestsInputs()}
                        <Button color="success" className="button-margin" onClick={this.addQuest}>Добавить</Button>
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

    getCSVData = () => {
        let data = [...this.state.tableData];

        data = data.map((elem, id) => {
            this.state.quests.forEach((quest) => {
                elem[(id + 1) + '.' + quest.name + ' : да'] = elem[quest.id + '_yes'];
                elem[(id + 1) + '.' + quest.name + ' : нет'] = elem[quest.id + '_no'];
                elem[(id + 1) + '.' + quest.name + ' : воздержался'] = elem[quest.id + '_'];
                delete elem[quest.id + '_yes'];
                delete elem[quest.id + '_no'];
                delete elem[quest.id + '_'];
            })
            return elem;
        })
        return data;
    }

    renderQuestsInputs = () => {
        let result = [];

        this.state.quests.forEach((elem) => {
            result.push(
                <div key={elem.id} className="quest-container">
                    <Input className="quest-input" key={elem.id} value={elem.name} onChange={this.onChangeQuestName(elem.id)}/>
                    <Button color="danger" onClick={this.delQuest(elem.id)}>Удалить</Button>
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
                        Header: "Да",
                        accessor: elem.id + "_yes",
                        Cell: this.renderEditable,
                        style: {
                            background: 'limegreen '
                        },
                        maxWidth: 50
                    },
                    {
                        Header: "Нет",
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
        let id = uuidv1();
        quests.push({
            id: id,
            name: "Вопрос"
        })
        this.setState({quests: quests});
        this.addQuestTableData(id);
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
        this.delQuestTableData(id);
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
        let data = [...this.state.tableData];
        data = data.map((elem) => {
            elem[id + '_yes'] = "";
            elem[id + '_no'] = "";
            elem[id + '_'] = "";
            return elem;
        })
        this.setState({ tableData: data});
    }

    delQuestTableData = (id) => {
        let data = [...this.state.tableData];
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