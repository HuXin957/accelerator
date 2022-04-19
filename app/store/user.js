import {makeAutoObservable} from "mobx";
import {P} from "app/utils/pagePermissions";

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
