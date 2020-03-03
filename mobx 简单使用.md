



### mobx

#### 配置

>首先配置 不需要弹射也可以设置create-react-app里面的webpack配置

##### 安装react-app-rewired 模块

```js
yarn add react-app-rewired
```

>在根目录下创建一个  **config-overrides.js** 文件，用于修改默认设置

```js
// config-overrides.js 文件

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return config;
}

//替换 package.json 中 scripts 执行部分
 /* package.json */
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

##### 安装customize-cra 模块

```js
yarn add customize-cra 
```

##### 配置装饰器 @   安装   @babel/plugin-proposal-decorators    模块

>配置 config-overrides.js 文件

```js
const { addDecoratorsLegacy, override, } = require('customize-cra');
module.exports = override(
  // 添加装饰器
  addDecoratorsLegacy(),
);
```

在这里@修饰符就配好了

#### 安装 mobx 模块

##### 创建一个store文件用来存放数据，store文件可以创建多个

>利用  mobx  中的  observable   来进行监听  利用action 来派发事件
>
>@observable 变量名=值  
>
>@action   方法名=()=>{
>  					修改数据
>  			}   
>
> 	 }

```js
import { observable, action } from "mobx"
class NumStore {
    @observable n = 3                  //这里n 就被监听上了
	@action changeData = () => {     //派发事件来进行改变n的数据
        this.n ++;
        console.log(this.n)    //这里当被组件点击触发的时候，发现值改变了，但是视图不刷新，需要监听
    }
}

let  store = new NumStore();
export default store
```

>创建一个One 组件，在One组件里面使用store的数据

引入 store 这个文件 ，然后就可以使用store里面的方法和数据了

```js
// One 组件
import React, { Component } from 'react'
import store from "../../store/index"    // 引入store

class One extends Component {   
  render() {
    console.log(store)  //打印store
    return (
      <div>
        {store.n}   // n === 3
        <button onClick={store.changeData} >+</button>  
      </div>
    )
  }
}

//点击调用store中的action 方法，发现store中的数据改变了，但是视图没更新，所以需要监听
```

##### 监听 让视图数据也改变  autorun

>在组件里面通过 mobx 的autorun 来进行监听 ，可以监听所有的数据变化，，然后将值设置为state,利用state数据达到数据更新

>注意，这里有两种监听方法
>
>  autorun  监听所有数据的变化  autorun(()=>{})
>  reaction 监听特定数据的变化  reaction(()=>[a,b....],()=>{ })
>
>监控数据变化
>       reaction(()=>[变量1，变量2...],()=>{
>       	    数组里的数据变化了，就回执行这个回调
>       	})
>        autorun(()=>{
>        	   只要store里的数据变化，就执行这个回调
>        	})



```js
// One 组件

import React, { Component } from 'react'
import store from "../../store/index"

import { autorun } from "mobx"     // 引入来进行监听

class One extends Component {
  constructor(props) {
    super(props)
    this.state = {     //设置state 来存store 里面的值 n
      n: store.n   //store 的初值
    }
  }

  componentDidMount() {    
    autorun(() => {           //利用autorun监听store中数据的改变
      this.setState({
        n: store.n         //重新设置state中的值
      })

    })
  }

  render() {
    console.log(store)
    return (
      <div>
        
        {this.state.n}      //利用state里获得的最新值来渲染页面
        
        <button onClick={store.changeData} >+</button>     //调用store中的action来让他++
      </div>
    )
  }
}

export default One
```

上面写了很多代码进行监听是不是很烦，下面咱们来个简单的

##### 安装  mobx-react  包。

```js
yarn add mobx-react
```

>导入这个包  import { observer } from "mobx-react"      
>
> @observer   利用这个来监听   在组件里监控store的数据变化并刷新组件(也是监听所有的数据，只要有变化就执行）

```js
import React, { Component } from 'react'
import store from "../../store/index"

import { autorun } from "mobx"

import { observer } from "mobx-react"    // 利用这个包进行监听

@observer                              //监控仓库里面的数据变化
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
```

注意： 上面哪种写法需要在每个文件里面引入store

>也可以用  mobx-react  里面的   inject 来进行注入store ，这里感觉不如上面好用，就不做介绍了
>
>import { observer,inject} from 'mobx-react';
>
> @inject("store")

##### 其他

store里面的index.js 文件

展示一下异步操作，还有mobx里的相当于计算属性的

```js
import {observable,action,computed} from 'mobx'
class NumStore {
   @observable n=3
   @observable list=[]
   @computed get age(){             //计算属性
      
       return this.n>=18?"你好先生或女士":"你好小朋友"
   }
   @action
    changeData=()=>{
        this.n++;
        console.log(this.n)
    }
    @action
    getData=()=>{           // 进行异步操作
        fetch("http://jsonplaceholder.typicode.com/posts").then((res)=>res.json()).then((res)=>{
         console.log(res);    
        this.list=res;
        })
    }
}

var s = new NumStore();

export default s;
```

