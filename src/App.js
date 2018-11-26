import React, {
  Component
} from 'react';
import './App.css';

import superagent from 'superagent';
require('dotenv').config();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.env.URL_BACKEND,
      cityName: '',
      latitude: '',
      longitude: '',
      formatted_query: ''
    }
  }

  static getDerivedStageFromProps(props, state) {
    console.log(state);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  formHandler = (event) => {
    event.preventDefault();
    superagent('get', `${this.state.url}/location?data=${this.state.cityName}`)
      .then(output => {
        // console.log(this.state.cityName);
        this.setState({
            latitude: output.body.latitude,
            longitude: output.body.longitude,
            formatted_query: output.body.formatted_query
          })
          .catch(console.error);
      })
  }


  render() {
    return ( 
      <React.Fragment >
      <form onSubmit = {
        this.formHandler
      } >
      <input name = 'cityName'
      onChange = {
        this.handleChange
      }
      /> 
      <button > Hit me! </button> 
      </form> 
      </React.Fragment>

    );
  }
}

export default App;