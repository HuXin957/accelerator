import React from 'react';
import {View, Text} from 'react-native';
import y from 'react-native-line-style';
import {statusHeight} from "app/utils/platform";

const withMixin = (WrapComponent) => {
  return class mixin extends WrapComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
    }

    render() {
      return (
        <View style={[y.pt_(statusHeight)]}>
          {super.render()}
        </View>
      )
    }
  }
}

export default withMixin;
