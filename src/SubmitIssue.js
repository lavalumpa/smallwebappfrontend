import axios from 'axios';
import React from 'react';

class SubmitIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      issue: '',
      description: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIssueChange = this.handleIssueChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleIssueChange(event) {
    this.setState({ issue: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post("http://localhost:8080/ticket", this.state);
    this.setState({
      name: '',
      issue: '',
      description: '',
    })
    this.props.updateTable();
  }

  render() {
    return (
      <div className='IssueForm'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
          <label>
            Issue:
          <input type="text" value={this.state.issue} onChange={this.handleIssueChange} />
          </label>
          <label>
            Description:
          <input type="textArea" value={this.state.description} onChange={this.handleDescriptionChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SubmitIssue;