import React from 'react';
import axios from 'axios';
import SubmitIssue from './SubmitIssue';
import Delete from './Delete';




class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: {
                content: []
            },
        }
        this.getTasks = this.getTasks.bind(this);
    }


    componentDidMount() {
        this.getTasks();
    }


    getTasks() {
        axios.get("http://localhost:8080/ticket")
            .then(res => {
                const tickets = res.data;
                this.setState({ tickets: tickets });
            })
    }

    display() {
        return this.state.tickets.content.map((ticket, index) => {
            const { id, name, issue, description } = ticket;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{issue}</td>
                    <td>{description}</td>
                    <Delete ticketId={id} updateState={this.getTasks} />         
                </tr>
            )
        })
    }



    render() {
        return (
            <div className="Tickets">
                <table>{this.display()}</table>
                <SubmitIssue updateTable={() => this.getTasks()} />
            </div>
        );
    }
}
export default Tickets;