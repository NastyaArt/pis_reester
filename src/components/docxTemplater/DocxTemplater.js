import React, { Component } from 'react';
import './DocxTemplater.css';
import { Button, Input, FormGroup, Form, Label, Col, Alert } from "reactstrap";

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import saveAs from 'file-saver';
import JSZipUtils from 'jszip-utils';

class DocxTemplater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: "templates/",
            template: ""
        };
    }
    render() {
        if (!this.props.data || !this.props.header) {
            return null;
        } else {
            return (
                <div className="docx-templater-container">
                    <Form onSubmit={this.createTemplate}>
                        <Alert color="danger" hidden={!this.state.error}>
                            Ошибка! Файла с таким именем не существует! Проверьте правильность введенного значения.
                    </Alert>
                        <FormGroup row>
                            <Label sm={4}>Шаблон</Label>
                            <Col sm={8}>
                                <Input value={this.state.template} onChange={this.handleChange("template")} placeholder='Введите имя шаблона...' />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <h6>Доступные переменные из реестра:</h6>
                            {this.renderTemplateData()}
                        </FormGroup>
                        <Button type="submit" disabled={this.state.template === ""}>Сгенерировать файлы по шаблону</Button>
                    </Form>
                </div>
            )
        }
    }

    handleChange = (fieldName) => (e) => {
        this.setState({ [fieldName]: e.target.value })
    }

    renderTemplateData = () => {
        let result = [];

        this.props.header.forEach((elem, id) => {
            result.push(
                <span key={id}>
                    {elem + ', '}
                </span>
            )
        })

        return result;
    }

    createTemplate = (e) => {
        e.preventDefault();
        if (this.state.template === "") {
            this.setState({ error: true })
            return;
        }

        this.setState({ error: false })

        let isError = false;

        //[dirty]
        const generateTemplates = async (data, template) => {

            for (let elem of data) {
                await new Promise((res, rej) => {
                    JSZipUtils.getBinaryContent(template, (error, content) => {
                        if (error) { throw error };
                        try {
                            var zip = new JSZip(content);
                        } catch (err) {
                            rej();
                            return;
                        };
                        var doc = new Docxtemplater().loadZip(zip);
                        doc.setData(elem);
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
                            console.log(JSON.stringify({ error: e }));
                            throw error;
                        }
                        var out = doc.getZip().generate({
                            type: "blob",
                            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        })
                        saveAs(out, this.state.template);
                        res();
                    });
                }).catch(() => {
                    isError = true;
                })

                if (isError) {
                    this.setState({ error: true })
                    return;
                }
            }
        }

        fetch(this.state.path + this.state.template).then((response) => {
            if (response.status === 200){
                generateTemplates(this.props.data, this.state.path + this.state.template);
            } else {
                this.setState({ error: true })
            }
        })

        return;
    }

};

export default DocxTemplater;