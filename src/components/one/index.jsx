import React, { Component } from 'react'
import store from "../../store/index"

import { autorun } from "mobx"

import { observer } from "mobx-react"

@observer  //监控仓库里面的数据变化
class One extends Component {

  render() {
    return (
      <div>
        {store.n}
        <button onClick={store.changeData} >+</button>
      </div>
    )
  }
}

export default One