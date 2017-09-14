import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import styled from 'styled-components';
import LoaderButton from "../atoms/LoaderButton";
import config from "../config";
import { invokeApig, s3Upload } from "../libs/awsLib";

const Form  = styled.form`
  padding-bottom: 15px;
`

const FormGroupStyled = styled(FormGroup)`
  textarea{
    height: 300px;
    font-size: 24px;
  }
`

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }

    this.setState({ isLoading: true });

    try {
      const uploadedFilename = this.file
        ? (await s3Upload(this.file)).Location
        : null;

      await this.createNote({
        content: this.state.content,
        attachment: uploadedFilename
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createNote(note) {
    return invokeApig({
      path: "/notes",
      method: "POST",
      body: note
    });
  }

  render() {
    return (
      <div className="NewNote">
        <Form onSubmit={this.handleSubmit}>
          <FormGroupStyled controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroupStyled>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </Form>
      </div>
    );
  }
}