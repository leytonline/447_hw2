import './App.css';
import React from 'react';
import axios from 'axios';
import SearchForm from './components/search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {getMessage: [], 
      users: [], 
      searchResponse: [],
      searchResults: [],
      name: "",
      idCreate: "",
      idDelete: "",
      score: "",
      nameSearch: "",
      idSearch: "",
      scoreSearch: ""
    };
  }

  setGetMessage(res) {
    this.setState({getMessage: res, 
      users: JSON.parse(res.data)});
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/hw2/api')
    .then(response => {
      this.setGetMessage(response);
    }).catch(error => {
      console.log(error);
    });
  }

  deleteForm() {
    const handleChange = (evt) => this.setState({...this.state, [evt.target.name]: evt.target.value});
    const handleSubmit = () => { 

      if (this.state.idDelete === "") {
        alert("ID cannot be left blank");
      }
      else {
        axios.delete("http://127.0.0.1:5000/hw2/api", { data:this.state })
        .then(response => {
          this.setGetMessage(response);
        }).catch(error => {
          console.log(error);
        });
      }
    };

    return (
      <div>
        <h1>Delete</h1>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <label>ID:</label>
          <input type="text" name="idDelete" value={this.state.id}></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  }

  createForm() {
    const handleChange = (evt) => this.setState({...this.state, [evt.target.name]: evt.target.value});
    const handleSubmit = () => { 
      if (this.state.name === "" || 
      this.state.idCreate === "" || this.state.score === "") {
        alert("all four fields must be populated");
      } else {
        axios.post("http://127.0.0.1:5000/hw2/api", {...this.state, pType: 'C'})
        .then(response => {
          this.setGetMessage(response);
        }).catch(error => {
          console.log(error);
        });
      }
    };

    return (
      <div>
        <h1>Create</h1>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name}></input><br></br>
          <label>ID:</label>
          <input type="text" name="idCreate" value={this.state.id}></input><br></br>
          <label>Score:</label>
          <input type="text" name="score" value={this.state.score}></input><br></br>
          <input type="submit"></input>
        </form>
      </div>
    );
  }

  makeTable() {
    if (this.state.users.length === 0) {
      return <h3>Nothing to display.</h3>;
    }

    return (
      <div>
        <h1>All data in table</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.name}</td>
                  <td>{val.id}</td>
                  <td>{val.score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="comp">
            <div>
              {this.createForm()}
            </div>
            <div>
              {this.deleteForm()}
            </div>
          </div>
          <div className="comp">
            <SearchForm/>
          </div>
          <br></br>
          <div className="comp">
            {this.state.getMessage.status === 200 ? 
            this.makeTable()
            :
            <h3>database didn't connect properly</h3>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;