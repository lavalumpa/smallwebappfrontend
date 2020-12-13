import React from 'react';
import axios from 'axios';
import SubmitIssue from './SubmitIssue'


class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
        }
        this.getTasks=this.getTasks.bind(this);
    }


    componentDidMount() {
        this.getTasks();
    }
    

    getTasks() {
        axios.get("http://localhost:8080/ticket")
            .then(res => {
                const tickets = res.data.content;
                this.setState({ tickets: tickets });
            })
    }

    display() {
        return this.state.tickets.map((ticket, index) => {
            const { id, name, issue, description } = ticket;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{issue}</td>
                    <td>{description}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="Tickets">
                <ul>{this.display()}</ul>
                <SubmitIssue updateTable={this.getTasks}/>
            </div>
        );
    }
}
export default Tickets;