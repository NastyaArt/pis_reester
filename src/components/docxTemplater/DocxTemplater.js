import React, { Component } from 'react';
import './DocxTemplater.css';
import { Button, Input, FormGroup, Form, Label, Col } from "reactstrap";

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import saveAs from 'file-saver';
import JSZipUtils from 'jszip-utils';

export const TEMPLATES = {
    MAIL: "mail.docx",
    ACT: "act.docx"
}

class DocxTemplater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            template: ""
        };
    }
    render() {
        console.log(this.state.template);
        if (!this.props.data || !this.props.header) {
            return null;
        } else {
            return (
                <div className="docx-templater-container">
                    <Form>
                        <FormGroup row>
                            <Label sm={4}>Шаблон</Label>
                            <Col sm={8}>
                                <Input type="select" value={this.state.template} onChange={this.handleChange("template")}>
                                    <option value="">Выберите шаблон...</option>
                                    <option value={TEMPLATES.MAIL}>{TEMPLATES.MAIL}</option>
                                    <option value={TEMPLATES.ACT}>{TEMPLATES.ACT}</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <h6>Доступные переменные из реестра:</h6>
                            {this.renderTemplateData()}
                        </FormGroup>
                        <Button onClick={this.createTemplate} disabled={this.state.template === ""}>Сгенерировать файлы по шаблону</Button>
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

    createTemplate = () => {
        if (this.state.template === "") {
            return;
        }

        this.props.data.forEach((elem) => {
            JSZipUtils.getBinaryContent(this.state.template, (error, content) => {
                if (error) { throw error };
                var zip = new JSZip(content);
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
            });
        })
    }

};

export default DocxTemplater;