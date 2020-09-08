import React from "react";

import { Digits } from "./number-buttons.data";
import Button from "../pad-button/pad-button.component";

import "./pad.styles.scss";

class NumberPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: Digits,
    };
    this.buttonCreator = this.buttonCreator.bind(this);
  }

  buttonCreator = (numbers) =>
    numbers.map((number, idx) => (
      <Button
        key={idx}
        id={number}
        value={idx.toString()}
        numFunc={this.props.addNumToDisplay}
        class="num-button"
      >
        {idx.toString()}
      </Button>
    ));

  render() {
    return (
      <div className="pad">
        {this.buttonCreator(this.state.buttons)}
        <Button
          class="func-button"
          id="add"
          func={() => this.props.addFuncToDisplay("+")}
        >
          +
        </Button>
        <Button
          class="func-button"
          id="subtract"
          func={() => this.props.addFuncToDisplay("-")}
        >
          -
        </Button>
        <Button
          class="func-button"
          id="multiply"
          func={() => this.props.addFuncToDisplay("*")}
        >
          *
        </Button>
        <Button
          class="func-button"
          id="divide"
          func={() => this.props.addFuncToDisplay("/")}
        >
          /
        </Button>
        <Button id="equals" class="func-button" func={this.props.getResult}>
          =
        </Button>
        <Button
          id="decimal"
          class="num-button"
          func={() => this.props.addNumToDisplay(".")}
        >
          .
        </Button>
        <Button id="clear" class="func-button" func={this.props.clearAll}>
          AC
        </Button>
      </div>
    );
  }
}

export default NumberPad;
