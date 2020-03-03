import { observable, action } from "mobx"
class NumStore {
  @observable n = 3
  @action changeData = () => {
    this.n++;
    console.log(this.n)
  }
}

let s = new NumStore();

export default s