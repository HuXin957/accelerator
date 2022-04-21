import {makeAutoObservable} from "mobx";

class Configure {
  hasNetwork = null //网络

  constructor() {
    makeAutoObservable(this)
  }

  setValue(key, value) {
    this[key] = value
  }


}

export default new Configure();
