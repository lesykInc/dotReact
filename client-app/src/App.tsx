import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
// import { cars } from './demo';
// import CarItem from './CarItem'

class App extends Component{
  state = {
    values: []
  }
  
  componentDidMount() {
    axios.get('http://localhost:5001/api/values')
        .then((response) => {
          console.log(response);
          this.setState({
            values: response.data
          })
        })
   
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {this.state.values.map((value: any) => (
           <li>{value.name}</li>   
          ))}
        </ul>
      </header>
      {/*<ul>*/}
      {/*  {cars.map((car) => (*/}
      {/*      <CarItem car={car}/>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
}
}

export default App;
