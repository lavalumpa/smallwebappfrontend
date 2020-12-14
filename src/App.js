
import './App.css';
import React from 'react';
import Tickets from './Tickets';


const imageURL = 'https://previews.123rf.com/images/larryrains/larryrains1605/larryrains160500844/57291799-complaint-box.jpg';

class App extends React.Component {

  render() {
    return (
      <div>
        <img
          src={imageURL}
          alt='Ticket'
          height={200}
          width={200}
        >
        </img>
        <Tickets />
        <a href={"https://github.com/vayser/react-js-pagination/issues/17"} target = '_blank' rel='noopener noreferrer'>
            test
        </a>
      </div>
    )
  }
}


export default App;

