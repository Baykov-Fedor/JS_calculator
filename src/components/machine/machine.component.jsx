import React from "react";

import Display from "../display/display.component";
import Pad from "../pad/pad.component";

import "./machine.styles.scss";
import { countArr } from "./machine-counter";

class Machine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNumber: "0",
      display: [],
      gotResult: false,
    };

    this.addNumToDisplay = this.addNumToDisplay.bind(this);
    this.addFuncToDisplay = this.addFuncToDisplay.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.getResult = this.getResult.bind(this);
  }

  addNumToDisplay(number) {
    // Если только что был получен результат
    if (this.state.gotResult) {
      this.setState({
        currentNumber: number,
        display: [],
        gotResult: false,
      });
    }
    // Чтобы не добавлять кучу бесполезных нулей и точек
    else if (
      (number === "0" && this.state.currentNumber[0] === "0") ||
      (number === "." && this.state.currentNumber.includes("."))
    ) {
      return;
    } else if (
      number !== "0" &&
      number !== "." &&
      this.state.currentNumber[0] === "0" &&
      !this.state.currentNumber.includes(".")
    ) {
      this.setState({
        currentNumber: number,
      });
    } else {
      this.setState({
        currentNumber: this.state.currentNumber + number,
      });
    }
  }

  addFuncToDisplay(func) {
    let display = this.state.display;
    let lastElem = display[display.length - 1];
    let notLastElem = display[display.length - 2];
    const operators = /[+/*]/;
    // Если только что был получен результат
    if (this.state.gotResult) {
      this.setState({
        display: [Number(this.state.currentNumber), func],
        currentNumber: "",
        gotResult: false,
      });
    } else if (!this.state.currentNumber) {
      if (func === "-" && lastElem === "-") {
        return;
      } else if (lastElem !== "-" && func === "-") {
        this.setState({
          display: [...display, func],
        });
      } else if (lastElem === "-" && operators.test(notLastElem)) {
        display.splice(display.length - 2, 2);
        this.setState({
          display: [...display, func],
          currentNumber: "",
        });
      } else {
        display.pop();
        this.setState({
          display: [...display, func],
          currentNumber: "",
        });
      }
    } else {
      const currentNumber = Number(this.state.currentNumber);
      this.setState({
        display: [...display, currentNumber, func],
        currentNumber: "",
      });
    }
  }

  getResult() {
    if (this.state.gotResult) return;
    const display = this.state.display;
    // Условие на основе последнего введенного в калькулятор оператора или числа
    if (this.state.currentNumber) {
      display.push(Number(this.state.currentNumber));
    } else {
      display.pop();
    }
    const result = Math.round(countArr(display) * 10000) / 10000;
    display.push("=", result);
    this.setState({
      display: display,
      currentNumber: result,
      gotResult: true,
    });
  }

  clearAll() {
    this.setState({
      currentNumber: "0",
      display: [],
      result: "",
      gotResult: false,
    });
  }

  render() {
    return (
      <div className="calculator">
        <Display
          display={this.state.display}
          currentNumber={this.state.currentNumber}
          result={this.state.result}
        />
        <Pad
          addNumToDisplay={this.addNumToDisplay}
          addFuncToDisplay={this.addFuncToDisplay}
          getResult={this.getResult}
          clearAll={this.clearAll}
        />
      </div>
    );
  }
}

export default Machine;
