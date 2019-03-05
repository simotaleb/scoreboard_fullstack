// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class App extends Component {
  // initialize state 
  state = {
    data: [],
    id: 0,
    player: '',
    score: 0,
  };

  // when component mounts, first thing it does is fetch all existing data in db
  componentDidMount() {
    this.getDataFromDb();
    this.forceUpdate();
  }
  
  //  method that uses backend api to 
  // fetch data from data base
  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  }

  // put method that uses backend api
  // to create new query into data base
  putDataToDB = (player, score) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      player: player,
      score: score
    });
    this.emptyFields();
  }

  // empty inputs after adding new player & score
  emptyFields = () => {
    this.setState({player : '', score: ''})
  }
  
  // compare two objects in this case score 
  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  // sort the list object by score
  sortBy = (key) => {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
  }
  

  render() {
    const { data } = this.state;
    return (
      <div>
        <Table className="table">
          <thead>
            <tr>
            <th>
              PLAYER
            </th>
            <th>
              SCORE
            </th>
            <th>
              <Button onClick={()=>this.sortBy('score')}>
                sort
              </Button>
            </th>
            </tr>
          </thead>
          <tbody>
          {
            data.map(dat => (
              <tr key={dat.id}>
                <td>{dat.player}</td>
                <td>{dat.score}</td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  value={this.state.player}
                  onChange={e => this.setState({player: e.target.value})}
                  placeholder="Player"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.score}
                  onChange={e => this.setState({score: e.target.value})}
                  placeholder="Score"
                />
              </td>
              <td>
                  <Button onClick={() => this.putDataToDB(this.state.player, this.state.score)}>
                    ADD
                  </Button>
                </td>
            </tr>
          </tbody>
          
        </Table>
      </div>
    );
  }
}

export default App;