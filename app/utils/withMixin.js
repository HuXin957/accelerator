import React from 'react';
import y from 'react-native-line-style';
import {observer} from "mobx-react";
import {statusHeight} from "app/utils/platform";
import {SafeAreaView} from "react-native-safe-area-context";
import userStore from 'app/store/user';
import pagePermissions from "app/utils/pagePermissions";

//功能：
//1、页面鉴权
//2、observer包裹
//3、状态栏、安全区域处理

const withMixin = (WrapComponent, options = {}) => {
  class mixin extends WrapComponent {
    isPass = true;

    constructor(props) {
      super(props);
      this.checkPermissions();
    }

    componentDidMount() {
      if (this.isPass) {
        super.componentDidMount && super.componentDidMount();
      }
    }

    //检查进入页面权限
    checkPermissions = () => {
      const pageName = this.props.route.name;

      if (!pagePermissions[pageName]) {
        return
      }

      this.isPass = pagePermissions[pageName].every(v => userStore.permissions.includes(v));

      //权限没通过
      if (!this.isPass) {
        this.props.navigation.replace('Login', {
          callback: () => {
            this.props.navigation.goBack();
          }
        })
      }
    }

    render() {
      if (!this.isPass) return null

      return (
        <SafeAreaView
          edges={options.edges || ['bottom']}
          mode={'padding'}
          style={[y.pt_(statusHeight), y.uf1, y.bgColor('#fff'), y.upr]}>
          {super.render()}
        </SafeAreaView>
      )
    }
  }

  return observer(mixin)
}

export default withMixin;
