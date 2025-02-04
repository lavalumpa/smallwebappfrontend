import React from 'react';
import axios from 'axios';


class Delete extends React.Component {
    delete(id) {
        axios.delete('http://localhost:8080/ticket/' + id)
            .then(resp => this.props.updateState());

    }

    render() {
        return (
            <button className='Delete' onClick={() => this.delete(this.props.ticketId)}>
                Delete
            </button>
        )
    }
}

export default Delete;