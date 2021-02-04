import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import { cars } from './demo';
// import CarItem from './CarItem'

class App extends Component{
  state = {
    values: []
  }
  
  componentDidMount() {
    this.setState({
      values: [{id:4, name: "Value 104"}, {id:2, name: "Value 102"}]
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
