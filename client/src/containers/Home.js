import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { invokeApig } from '../libs/awsLib';

const Lander = styled.div`
  padding: 80px 0;
  text-align: center;
`

const Title = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
`

const Text = styled.p`
  color: #999;
`

const LinkContainer = styled.div`
  padding-top: 20px;
  a:first-child {
    margin-right: 20px;
  }
`

const ListGroupItemStyled = styled(ListGroupItem)`
  h4 {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    overflow: hidden;
    line-height: 1.5;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  p {
    color: #666;
  }
`

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.notes();
      this.setState({ notes: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return invokeApig({ path: "/notes" });
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <ListGroupItemStyled
            key={note.noteId}
            href={`/notes/${note.noteId}`}
            onClick={this.handleNoteClick}
            header={note.content.trim().split("\n")[0]}
          >
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroupItemStyled>
          : <ListGroupItemStyled
            key="new"
            href="/notes/new"
            onClick={this.handleNoteClick}
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
              </h4>
          </ListGroupItemStyled>
    );
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderLander() {
    return (
      <Lander className="lander">
        <Title>Scratch</Title>
        <Text>A simple note taking app</Text>
        <LinkContainer>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
        </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
        </Link>
        </LinkContainer>
      </Lander>
    );
  } 

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}