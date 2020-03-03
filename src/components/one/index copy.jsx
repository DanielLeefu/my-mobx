import React, { Component } from 'react'
import store from "../../store/index"

import { autorun } from "mobx"

class One extends Component {
  constructor(props) {
    super(props)
    this.state = {
      n: store.n   //store 的初值
    }
  }

  componentDidMount() {
    autorun(() => {  //监听store中数据的改变
      this.setState({
        n: store.n
      })

    })
  }

  render() {
    console.log(store)
    return (
      <div>
        {/* {store.n} */}
        {this.state.n}
        <button onClick={store.changeData} >+</button>
      </div>
    )
  }
}

export default One