import React from 'react';
import {View, Text, TextInput, ScrollView, StatusBar} from 'react-native';
import withMixin from "app/utils/withMixin";
import y from 'react-native-line-style';

export const Input = (props) => {
  return (
    <TextInput
      {...props}
      style={[y.h(42),y.ba(2), y.bgColor('#eee'), y.radiusA(20), y.fSize(14), y.plr(20), props.style].concat(props.style)}
    />
  )
}
