import React from "react";
import "./inputText.css";
import axios from "axios";

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      frequency: "10 seconds",
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
  }

  handleClick = (event) => {
    const enteredEmail = prompt(
      "Please enter your Email for confirmation email"
    );
    this.setState({ email: enteredEmail });
    setTimeout(100)
    this.submitList(this.state);
  };

  updateVal = (e) => {
    this.setState({
      url: e.target.value,
    });
  };
  handleChange = (e) => {
    this.setState({
      frequency: e.target.value,
    });
  };

  submitList = async (e) => {
    let res = await axios({
      url: "http://localhost:3001/apicall",
      method: "POST",
      data: e,
    });
  };
  urlChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div class="container">
        <form>
          <div class="body">
            <label for="url" class="label">
              <h3>Monitor Your Web Page</h3>
            </label>
          </div>
          <div class="inputField">
            <input
              id="url"
              class="input"
              value={this.state.value}
              type="text"
              placeholder="Enter the URL?"
              onChange={this.urlChange}
              // onChange={this.updateVal}
            />
          </div>
          <div class="select">
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="10 seconds">10 seconds</option>
              <option value="1 minute">1 minute</option>
              <option value="10 minutes">10 minutes</option>
              <option value="15 minutes">15 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="4 hour">4 hour</option>
              <option value="6 hour">6 hour</option>
            </select>
          </div>
          <div class="button">
            <input class="apunButton" type="button" value="Monitor" onClick={this.handleClick} />
          </div>
        </form>
      </div>
    );
  }
}

export default InputText;
