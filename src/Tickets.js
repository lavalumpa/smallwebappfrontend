import React from 'react';
import axios from 'axios';
import SubmitIssue from './SubmitIssue';
import Delete from './Delete';
import ReactPaginate from 'react-paginate';




class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsPageInfo: null,
            currentPage:0,
            isTicketLoaded: false
        }
        this.getTasks = this.getTasks.bind(this);
    }


    componentDidMount() {
        this.getTasks(0);
    }


    getTasks(page) {
        axios.get(`http://localhost:8080/ticket?page=${page}`)
            .then(res => {
                const tickets = res.data;
                this.setState({ 
                    ticketsPageInfo: tickets,
                    currentPage: page,
                    isTicketLoaded: true
                 });
                
            })
    }

    tableContent() {
        const tickets=this.state.ticketsPageInfo.content;
        return tickets.map((ticket, index) => {
            const { id, name, issue, description } = ticket;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{issue}</td>
                    <td>{description}</td>
                    <Delete ticketId={id} updateState={()=>this.updateAfterDeletion(this.state.currentPage)} />
                </tr>
            )
        })
    }

    

    updateAfterDeletion(currentPage){
        if (this.isLastPageWithOneElement(currentPage)){
            this.getTasks(currentPage-1);
        } else {
            this.getTasks(currentPage);
        }
    }

    isLastPageWithOneElement(currentPage){
       return this.state.ticketsPageInfo.totalElements %10===1 && (currentPage+1)===this.state.ticketsPageInfo.totalPages;
    }


    render() {
        if (this.state.isTicketLoaded===false){
            return <div>
                loading
            </div>
        }
        return (
            <div className="Tickets">
                <table>{this.tableContent()}</table>
                <ReactPaginate
                    pageCount={this.state.ticketsPageInfo.totalPages}
                    forcePage={this.state.currentPage}
                    pageRangeDisplayed={3}
                    onPageChange={(page)=>this.getTasks(page.selected)}
                />
                <SubmitIssue updateTable={() => this.getTasks(this.state.currentPage)} />

            </div>
        );
    }
}
export default Tickets;