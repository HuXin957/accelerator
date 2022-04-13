import React from 'react';
import {View, Text} from 'react-native';
import y from 'react-native-line-style';
import {statusHeight} from "app/utils/platform";
import {SafeAreaView} from "react-native-safe-area-context";

const withMixin = (WrapComponent, noEdges) => {
  return class mixin extends WrapComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
    }

    render() {

      return (
        <SafeAreaView
          edges={noEdges ? ['left'] : ['bottom']}
          mode={'padding'}
          style={[y.pt_(statusHeight), y.uf1, y.bgColor('#fff'), y.upr]}>
          {super.render()}
        </SafeAreaView>
      )
    }
  }
}

export default withMixin;
