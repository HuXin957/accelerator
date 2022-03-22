import React, {Component} from 'react';
import {
  TouchableOpacity,
} from "react-native";


export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      minTime: props.minTime || 400,
    };
  }


  render() {
    const {style, activeOpacity, onPress, children} = this.props
    return (
      <TouchableOpacity
        ref={"TouchableOpacity"}
        {...this.props}
        style={style}
        activeOpacity={activeOpacity || 0.7}
        onPress={() => {
          if (!onPress) {
            return;
          }
          let curTime = new Date().getTime();
          if (curTime - this.state.time > this.state.minTime) {
            this.state.time = curTime;
            onPress();
          }
        }}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
