import './tickets.css';
import React from 'react';
import axios from 'axios';
import SubmitIssue from './submitissue.js';
import Delete from './delete';
import ReactPaginate from 'react-paginate';


const imageURL = 'https://previews.123rf.com/images/larryrains/larryrains1605/larryrains160500844/57291799-complaint-box.jpg';

class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsPageInfo: null,
            currentPage: 0,
            isTicketLoaded: false
        }
        this.getTasks = this.getTicketsPage.bind(this);
    }


    componentDidMount() {
        this.getTicketsPage(0);
    }

    tableContent() {
        const tickets = this.state.ticketsPageInfo.content;
        return tickets.map((ticket, index) => {
            const { id, name, issue, description } = ticket;
            return (
                <tr className={'table-row'} key={id}>
                    <td className={'td-id'}>{id}</td>
                    <td className={'td-name'}>{name}</td>
                    <td className={'td-issue'}>{issue}</td>
                    <td className={'td-issue'}>{description}</td>
                    <td><Delete ticketId={id} updateState={() => this.updateAfterDeletion(this.state.currentPage)} /></td>
                </tr>
            )
        })
    }



    updateAfterDeletion(currentPage) {
        if (this.isLastPageWithOneElement(currentPage)) {
            this.getTicketsPage(currentPage - 1);
        } else {
            this.getTicketsPage(currentPage);
        }
    }

    isLastPageWithOneElement(currentPage) {
        return this.state.ticketsPageInfo.totalElements % 10 === 1 && (currentPage + 1) === this.state.ticketsPageInfo.totalPages;
    }

    getTicketsPage(page) {
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

    render() {
        if (this.state.isTicketLoaded === false) {
            return <div>
                loading
            </div>
        }
        return (
            <div >
                <img
                    src={imageURL}
                    alt='Ticket'
                ></img>
                <table className={"ticket-table"}>
                    <thead className='table-header'>
                        <tr>
                            <th scope="col" className={'th-id'}>id</th>
                            <th scope="col" className={'th-username'}>username</th>
                            <th scope="col" className={'th-issue'}>issue</th>
                            <th scope="col" className={'th-description'}>description</th>
                            <th scope="col" className={'th-delete'}></th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                        {this.tableContent()}
                    </tbody>
                </table>
                <ReactPaginate
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    nextClassName={"item next "}
                    pageClassName={'item pagination-page '}
                    previousClassName={"item previous"}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={this.state.ticketsPageInfo.totalPages}
                    forcePage={this.state.currentPage}
                    pageRangeDisplayed={3}
                    onPageChange={(page) => this.getTicketsPage(page.selected)}
                />
                <SubmitIssue updateTable={() => this.getTicketsPage(this.state.currentPage)} />
            </div>
        );
    }
}

export default Tickets;