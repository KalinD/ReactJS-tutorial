import React, { Component } from 'react';
import Button from './components/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: '0',
      previous: [],
      nextIsReset: false
    };
  }

  reset = () => {
    this.setState({ result: '0', previous: [], nextIsReset: false, current: '0'});
  }

  addToCurrent = (symbol) => {
    if (["/", "-", "+", "*"].indexOf(symbol) > -1) {
      let { previous } = this.state;
      previous.push(this.state.current + symbol);
      this.setState({ previous, nextIsReset: true });
    } else {
      if (this.state.nextIsReset || (this.state.current === "0" && symbol !== ".")) {
        this.setState({
          current: symbol,
          nextIsReset: false
        });
      } else {
        this.setState({
          current: this.state.current + symbol
        });
      }
    }
  }

  calculate = (symbol) => {
    if (this.state.previous.length <= 0) { 

    }
    let operation = this.state.previous[this.state.previous.length - 1];
    operation = operation[operation.length - 1];
    let firstNumber = Number(this.state.previous[this.state.previous.length - 1].slice(0, -1));
    let secondNumber = Number(this.state.current);
    let { current } = this.state;
    switch (operation) { 
      case "+":
        current = firstNumber + secondNumber;
        break;
      case "-":
        current = firstNumber - secondNumber;
        break;
      case "*":
        current = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber === 0) {
          current = "undefined";
        } else { 
          current = firstNumber / secondNumber;
        }
        break;
      default:
        current = "Operator unrecognized";
        break;
    }
    this.setState({
      current,
      previous: [],
      nextIsReset: true
    });
  }

  render() {
    const buttons = [
      { symbol: 'C', cols: 3, action: this.reset },
      { symbol: '/', cols: 1, action: this.addToCurrent },
      { symbol: '7', cols: 1, action: this.addToCurrent },
      { symbol: '8', cols: 1, action: this.addToCurrent },
      { symbol: '9', cols: 1, action: this.addToCurrent },
      { symbol: '*', cols: 1, action: this.addToCurrent },
      { symbol: '4', cols: 1, action: this.addToCurrent },
      { symbol: '5', cols: 1, action: this.addToCurrent },
      { symbol: '6', cols: 1, action: this.addToCurrent },
      { symbol: '-', cols: 1, action: this.addToCurrent },
      { symbol: '1', cols: 1, action: this.addToCurrent },
      { symbol: '2', cols: 1, action: this.addToCurrent },
      { symbol: '3', cols: 1, action: this.addToCurrent },
      { symbol: '+', cols: 1, action: this.addToCurrent },
      { symbol: '0', cols: 2, action: this.addToCurrent },
      { symbol: '.', cols: 1, action: this.addToCurrent },
      { symbol: '=', cols: 1, action: this.calculate }
    ];
    return (
      <div className="App">
        {(this.state.previous.length > 0) ?
          <div className="previous" >{this.state.previous[this.state.previous.length - 1]}</div>
          : null
        }
        <input className="result" type="text" value={this.state.current} />
        {buttons.map((btn, index) => {
          return <Button key={index} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
        })}
      </div>
    );
  }
}

export default App;