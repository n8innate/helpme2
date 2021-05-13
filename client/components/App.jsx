import React from 'react';
import { transform } from 'babel-standalone';
import thatWork from '../../node_modules/react-dom/cjs/react-dom.development.js';
import Test from './Test.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileLoad = this.handleFileLoad.bind(this);
    this.state = {
      hi: 'hello',
    };
  }

  handleFileLoad(event) {
    event.preventDefault();
    console.log('here');
    console.log('target');
    var output = transform(
      event.target.result,
      {
        presets: ['es2015', 'react'],
      },
      (err, result) => {
        if (err) return;
        return result;
      }
    );
    console.log(output);
    //document.getElementById('fileContent').textContent = output;
  }

  componentDidMount() {
    console.log(thatWork, 'this that work dawg');
    document
      .getElementById('fileInput')
      .addEventListener('change', this.handleFileLoad, false);
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleFileLoad(e)}>
          <input type='file' id='fileInput'></input>
          <input type='submit'></input>
        </form>
        <Test hi={this.state.hi} />
        <div id='fileContent'></div>
      </div>
    );
  }
}

export default App;
