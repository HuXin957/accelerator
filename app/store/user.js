import {makeAutoObservable} from "mobx";

class User {
  permissions = [];//权限
  test=true

  constructor() {
    makeAutoObservable(this)
  }

  setValue(key, value) {
    this[key] = value
  }


}

export default new User();
