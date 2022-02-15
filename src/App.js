import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      host : '',
    }
  }

  state = {
    query: ""
  };
  

  // componentDidMount() {
  //   this._getHost();
  // }

  _getHost = async() => {
    const res = await axios.get('/api/host');
    this.setState({ host : res.data.host })
  }

  componentDidMount() {
    this._getHost();
  }
  
  _dbTest = async() => {
    const res = await axios.get('/api/test');
    console.log(res.data)
  }

  handleInputKeyPress = event => {
    if (event.key === "Enter") {
      //console.log(event.target.value);
      this.setState({
        query: event.target.value
      });
      event.target.value = "";
    }
  };

  

  render() {
    return(
      <Container query={this.state.query}>
        <div className='App'>
          <h3> Welcome to <u> {this.state.host} </u> Blog! </h3>
          <Input placeholder="테마를 입력하세요" onKeyPress={this.handleInputKeyPress}></Input>
        </div>
      </Container>
    )
  }
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    url(https://source.unsplash.com/random/1920x1080?${props => props.query});
  background-size: cover;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  width: 190px;
  height: 33px;
  padding: 3px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 22px;
  color: white;
`;

export default App;


