import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      host : '', 
      list : [],
      update : false,
    }
  }

  state = {
    query: "", name:""
  };
  

  // componentDidMount() {
  //   this._getHost();
  // }

  _getHost = async() => {
    const res = await axios.get('/api/host');
    this.setState({ host : res.data.host })
  }

  componentDidMount() {
    //this._getHost();
    this._getData();
  }

  _addData = async(e) => {
    const { name } = this.state;
    e.preventDefault();
    
    const res = await axios('/add/data', {
      method : 'POST',
      data : { 'data' : name },
      headers: new Headers()
    })

    if(res.data) {
      alert('데이터를 추가했습니다.');
      return window.location.reload();
    }
  }

  _nameUpdate(e) {
    this.setState({ name : e.target.value })
  }

  _getData = async () => {
    const res = await axios.get('/get/data');

    if(res.data[0] === undefined) {
      let cover = [];
      cover.push(res.data);

      return this.setState({ list : cover })
    }
    this.setState({ list : res.data });
  }

  _modify = async (el) => {
    const modify = prompt(el.name + '을 어떤 이름으로 변경할까요?')

    if(modify !== null) {
      const body = {
        name : modify,
        id : el.id
      }

      const res = await axios('/modify/data', {
        method : 'POST',
        data : { 'modify' : body },
        headers: new Headers()
      })

      if(res.data) {
        alert('데이터를 수정했습니다.')
        return window.location.reload();
      }
    }
  }

  _delete = async (el) => {
    const remove = window.confirm(el.name + '을 삭제합니까?');

    if(remove) {
      const body = { id : el.id }
      const res = await axios('/delete/data', {
        method : 'POST',
        data : { 'delete' : body },
        headers: new Headers()
      })
      
      if(res.data) {
        alert('데이터를 삭제했습니다.')
        return window.location.reload();
      }
    }
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
    const { list } = this.state;

    return(
      <Container query={this.state.query}>
        <div className='App'>
          <h3> Welcome to <u> {this.state.host} </u> Blog! </h3>
          <Input placeholder="테마를 입력하세요" onKeyPress={this.handleInputKeyPress}></Input>

          <br />
          <form method='POST' onSubmit={this._addData}>
            <input type='text' maxLength='10' onChange={(e) => this._nameUpdate(e)}/>
            <input type='submit' value='Add' />
          </form>

          <br /> <br />
          <div style={{ height : '250px', overflow : 'auto' }}>
            <h4 style={{ color : '#ababab'}}> Teachers List </h4>

              <div style={{ border : 'solid 1px black', width : '50%', marginLeft : '25%', textAlign : 'left' }}>
                <div style={{ display : 'grid', gridTemplateColumns : '32% 35% 30%', textAlign : 'center' }}>
                  <div> Number </div>
                  <div> Name </div>
                  <div> Other </div>
                </div>
              </div>

              {list.length !== 0
              ? list.map( (el, key) => {
                return(
                  <div key={key} style={{ display : 'grid', lineHeight : '40px', gridTemplateColumns : '32% 35% 30%', width : '50%', marginLeft : '25%'}}>
                    <div> {el.id} </div>
                    <div> {el.name} </div>
                    <div
                      style={{ color : '#ababab' }} 
                      onClick={() => this._modify(el)}> Modify </div>
                    <div
                      style={{ color : '#ababab' }} 
                      onClick={() => this._delete(el)}> Delete </div>

                  </div>
                )
              })
            
              : null}
          </div>

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


