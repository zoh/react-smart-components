import React, { Component } from "react";
import "./App.css";

import NumberInput from "components/NumberInput";

class App extends Component {
  state = {
    number: null
  };

  onChange = val => {
    this.setState({ number: val });
  };

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Comma Number input
          <NumberInput value={this.state.number} onChange={this.onChange} />
        </p>
      </div>
    );
  }
}

export default App;
